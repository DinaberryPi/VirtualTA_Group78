# VirtualTA_Group78
## Install New Dependency:
Use the pipenv install command followed by the name of the package you want to install. 

For example, to install the requests package, you would run:
pipenv install requests 

This command will install the requests package and automatically update your Pipfile and Pipfile.lock with the new dependency and its version.


## Running Project:
To run your project using pipenv, you can use the pipenv run command followed by the command you want to execute. This ensures that your project is run within the context of the virtual environment managed by pipenv. 

### Activate the Virtual Environment (Optional):
Before running your project, you may want to activate the virtual environment to ensure that all dependencies are available. You can activate the virtual environment by running: pipenv shell    This command activates the virtual environment, and subsequent commands will be executed within its context. You only need to activate the virtual environment once per terminal session. 
### Run Your Project:
Once the virtual environment is activated (or if you choose not to activate it), you can run your project using pipenv run followed by the command you use to run your project. 
For example: pipenv run python your_script.py    Replace your_script.py with the name of your Python script or the command you use to run your project. This command ensures that your project is executed within the virtual environment, and all dependencies specified in the Pipfile are available for use. 
By using pipenv run, you ensure that your project is executed within the context of the virtual environment managed by pipenv, regardless of whether the virtual environment is activated or not. This helps ensure that your project runs with the correct dependencies and avoids conflicts with dependencies installed in other environments.
