
import pickle
import sys

temperature = float(sys.argv[1])
humidity = float(sys.argv[2])

with open('logistic_regression_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

prediction = model.predict([[temperature, humidity]])

print(prediction[0])
