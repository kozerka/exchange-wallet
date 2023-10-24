# Setting Up the `.env` File

For the proper configuration of the environment in our project, you will need a `.env` file. Here's a step-by-step guide to help you set it up.

## 1. Create a `.env` file in the root directory of the project

In the main directory of your project, create a new file named `.env`.

## 2. Add configuration keys

Inside the `.env` file, add the following keys:


```javascript
REACT_APP_API_URL=YourURLHere
REACT_APP_API_KEY=YourAPIKeyHere
```



- `REACT_APP_API_URL`: The URL endpoint for your API.
- `REACT_APP_API_KEY`: The API key required for authentication.

## 3. Fill in the appropriate values

Replace `YourURLHere` and `YourAPIKeyHere` with the actual values that you have or were provided by your system's administrator/designer.

## 4. Save and close the file

After adding the appropriate values, save the file and close it.

## 5. (Optional) Add `.env` to `.gitignore`

If you do not want your `.env` file to be pushed to your remote repository (for security reasons), ensure that you've added `.env` to the `.gitignore` file in the project's main directory.

## 6. Run the project

Now that your `.env` file is set up, you can run your project. If everything is configured correctly, your environment variables will be loaded when the project starts up.


For the project I have used 
```javascript
REACT_APP_API_URL=https://api.apilayer.com/exchangerates_data
```


Good Luck!
