
# SE 2 Project
This is the report of our project for the class "Software Engineering 2". Here you can find the information about the role division, the problems found and the general developing of the project.

## Our project
Our project consists in the creation of some APIs  that can be used in the creation of an application for the clients of a gym. Our APIs allow to manage the users pool, to help the users visualizing the exercises that have to be performed, to modify this exercises, to view the progression of the improvements of the athletes, to visualize some information of the gym and to have a chat between the personal trainer and the athletes.
The innovation performed by this application over the current similar applications is the chat with the personal trainer. Indeed, after a phase of benchmarking on Google Play Store and on the Apple App Store, we didn't found an application with this plus.
## Role division
First of all we decided our roles, we gave to Jacopo Sitran the role of Product Owner for of his experience in the gym environment so he would be more qualified for the collection of the requirements.
We chose Francesco Pavanello as our scrum master because of his ability to motivate all the team.
All the others got the role of developers, obviously also Jacopo and Francesco developed some APIs so they were also developers. 
## Requirements collection
Our client is the owner of the gym in which Jacopo used to train. He talked with him trying to understand which features would be useful in an application that should be used by personal trainers and clients. After that, during the developing phase, Jacopo  asked some clarification via Whatsapp
## Product backlog
After collecting the requirements we started a mindstorm phase  trying to choose which user stories will be  developed in the first spring. After this selection we wrote a product backlog with five different user stories, Jacopo (the Product Owner) decided the value points of each story and then all the team played planning poker (using values taken from the Fibonacci sequence) in order to state the story values. After that we calculated the BTFB and we wrote the product backlog ordering the user story by BTFB. 

## Development phase
After assigning one each story to each member of the team we started developing the APIs following the resful pattern. After a meeting with Jorge we had to rewrite the product backlog because we developed a user story not needed (the login) 

## Documentation phase
Once finished developing and testing the APIs we learned swagger language in order to write the documentation of each API

## Problems
The main problem was deciding the JSON policy messages and try to maintain a common standard between the APIs developed by different team members. Another difficulties was to have a common database between the user story 1 and 3 because a message can be send only to an actual existing user.
Other few problem about the yaml format and the use of swagger 2.0 instead of 3.0 (Some feature are not supported by the previous version).


## Scheduling
We took one week to choose the project and to do the user stories.
Another week was taken for developing the APIs.
We used the last few days of the second week to merge the APIs and to develop the documentation.
