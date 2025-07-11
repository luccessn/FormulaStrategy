import pandas as pd 
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np 
from prophet import Prophet
from sklearn.ensemble import RandomForestClassifier
import joblib  # მოდელის შენახვა/ჩატვირთვისთვის

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/custom_predict", methods=["POST"])
def custom_predict():
    data = request.get_json()
    time = data.get("time")
    tyre = data.get("tyre")
    track_temp = data.get("trackTemp")  # key უნდა დაემთხვეს Frontend-ს
    weather = data.get("weather")

    result = f"Received: time = {time}, tyre = {tyre}, trackTemp = {track_temp}, weather = {weather}"
    return jsonify({"prediction": result})


def convert_time_to_seconds(time_str):
    try:
        if ':' in time_str:
            minutes, seconds = time_str.split(':')
            return int(minutes) * 60 + float(seconds)
        return float(time_str)
    except Exception as e:
        print("Error parsing time:", e)
        return 0


def prepare_prophet_data(df):
    prophet_df = pd.DataFrame()
    prophet_df['ds'] = df['lap']
    prophet_df['y'] = df['time']
    return prophet_df


@app.route('/nextlap_predict', methods=['POST'])
def nextlap_predict():
    data = request.json
    df = pd.DataFrame(data)

    if 'time' not in df.columns or 'lap' not in df.columns:
        return jsonify({'error': 'Missing time or lap columns'}), 400

    # Convert time strings to seconds
    df['time'] = df['time'].apply(convert_time_to_seconds)

    # Prepare data for Prophet
    df = prepare_prophet_data(df)

    model = Prophet()
    model.fit(df)

    # Predict 1 future lap
    future = model.make_future_dataframe(periods=1, freq='D')  # laps treated as days here
    forecast = model.predict(future)
    predicted_next_lap = forecast.iloc[-1]['yhat']

    return jsonify({'nextlap_predict': round(predicted_next_lap, 3)})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
