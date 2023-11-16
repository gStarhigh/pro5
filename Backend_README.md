# React project (Project Portfolio 5, Advanced FrontEnd) for Code Institute.

## General information


Link to the application: [Click Here!](https://pro5-aeecc7322fbc.herokuapp.com/)



---
## Table of Contents

 - ## [General Information](#general-information)

 - ## [Table of Contents](#table-of-contents-1)

 - ## [User Stories](#user-stories-1)

 - ## [Database](#database-1)
    
- ## [Testing](#testing-1)
    - ## [Code Validation](#code-validation-1)
    - ## [Manual Testing](#manual-testing-1)
    - ## [Future improvements](#Future-improvements-1)
- ## [Bugs](#Bugs-1)

- ## [Libraries and Software](#Libraries-and-Software-1)



---
# User Stories/Tasks

| **EPIC** | **ID #** | **Task** | **Label** | **Github project** |
|-------------|------------|---------------------|---------------------|---------------------|
| **Create the Profile model** | 1 |  || [Link](https://github.com/users/gStarhigh/projects/5/views/1?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C%22Status%22%2C%22Labels%22%2C%22Milestone%22%5D&filterQuery=milestone%3AModels&pane=issue&itemId=41082447)
|  |  | Create the model.py. | Must Have |
|  |  | Create the views.py. | Must Have |
|  |  | Create the serializers.py. | Must Have |
|  |  | Create the urls.py. | Must Have |
| **Create the Post model** | 2 |  || [Link](https://github.com/users/gStarhigh/projects/5/views/1?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C%22Status%22%2C%22Labels%22%2C%22Milestone%22%5D&filterQuery=milestone%3AModels&pane=issue&itemId=41082145)
|  |  | Create the model.py. | Must Have |
|  |  | Create the views.py. | Must Have |
|  |  | Create the serializers.py. | Must Have |
|  |  | Create the urls.py. | Must Have |
| **Create the Likes model** | 3 |  || [Link](https://github.com/users/gStarhigh/projects/5/views/1?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C%22Status%22%2C%22Labels%22%2C%22Milestone%22%5D&filterQuery=milestone%3AModels&pane=issue&itemId=41082198)
|  |  | Create the model.py. | Must Have |
|  |  | Create the views.py. | Must Have |
|  |  | Create the serializers.py. | Must Have |
|  |  | Create the urls.py. | Must Have |
| **Create the Followers model** | 4 |  || [Link](https://github.com/users/gStarhigh/projects/5/views/1?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C%22Status%22%2C%22Labels%22%2C%22Milestone%22%5D&filterQuery=milestone%3AModels&pane=issue&itemId=41082242)
|  |  | Create the model.py. | Must Have |
|  |  | Create the views.py. | Must Have |
|  |  | Create the serializers.py. | Must Have |
|  |  | Create the urls.py. | Must Have |
| **Create the Comment model** | 7 |  || [Link](https://github.com/users/gStarhigh/projects/5/views/1?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C%22Status%22%2C%22Labels%22%2C%22Milestone%22%5D&filterQuery=milestone%3AModels&pane=issue&itemId=41100016)
|  |  | Create the model.py. | Must Have |
|  |  | Create the views.py. | Must Have |
|  |  | Create the serializers.py. | Must Have |
|  |  | Create the urls.py. | Must Have |
| **Create the Information model** | 15 |  || [Link](https://github.com/users/gStarhigh/projects/5/views/1?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C%22Status%22%2C%22Labels%22%2C%22Milestone%22%5D&filterQuery=milestone%3AModels&pane=issue&itemId=41896728)
|  |  | Create the model.py. | Must Have |
|  |  | Create the views.py. | Must Have |
|  |  | Create the serializers.py. | Must Have |
|  |  | Create the urls.py. | Must Have |
| **Create the Contact model** | 27 |  || [Link](https://github.com/users/gStarhigh/projects/5/views/1?visibleFields=%5B%22Title%22%2C%22Assignees%22%2C%22Status%22%2C%22Labels%22%2C%22Milestone%22%5D&filterQuery=milestone%3AModels&pane=issue&itemId=44330597)
|  |  | Create the model.py. | Must Have |
|  |  | Create the views.py. | Must Have |
|  |  | Create the serializers.py. | Must Have |
|  |  | Create the urls.py. | Must Have |


---



## Database
The project uses the PostgreSQL relational Database for storing Data. This project was set up using [ElephantSQL](https://elephantsql.com/).


### Models

#### User Model
- User Model is a part of the Django Rest Framework dj-rest-auth library. It contains basic information about authenticated users such as Username & Password.

#### Profile Model
- Profile model is created for users to add or change the details on their profile page such as, Name, Bio & Profile Image.

| **Name** | **Field Type** | **Validation** |
|-------------|------------|---------------------|
| owner | OneToOneField | User, on_delete=models.CASCADE | 
| created_at | DateTimeField | auto_now_add=True |
| updated_at | DateTimeField | auto_now_add=True |
| name | CharField | max_length=255, blank=True |
| content | TextField | blank=True |
| image | ImageField | upload_to="images/", default="../default_profile" |

- Owner has a OneToOne relationship with the User model. If the User object is deleted also deletes the object that has the Foreign Key.
- Created_at is a DateTimeField that automatically sets the time and date when created.
- Updated_at is a DateTimeField that automatically sets the time and date when updated.
- Name is a Charfield with an allowed max length of 255. This field is allowed to be empty.
- Content is a Textfield that is allowed to be empty.
- Image contains the profile image, and if none is chosen by the user, defaults to the default profile picture.


<details>
<summary>Model image</summary>
<img src="documentation/testing/validation/python/profiles/models.png">
</details>

#### Comments Model
- Stores the users Comments on a post.

| **Name** | **Field Type** | **Validation** |
|-------------|------------|---------------------|
| owner | ForeignKey | User, on_delete=models.CASCADE | 
| post | ForeignKey | Post, on_delete=models.CASCADE |
| created_at | DateTimeField | auto_now_add=True |
| updated_at | DateTimeField | auto_now=True |
| content | TextField |  |

- Owner has a OneToOne relationship with the User model. If the User object is deleted also deletes the object that has the Foreign Key.
- Post has a OneToOne relationship with the Post model. Each comment is associated with one post, but each post can have multiple comments.
- Created_at is a DateTimeField that automatically sets the time and date when created.
- Updated_at is a DateTimeField that automatically sets the time and date when updated.
- Content is a TextField that stores the content of the comment. This does not allow for blank values.


<details>
<summary>Model image</summary>
<img src="documentation/testing/validation/python/comments/models.png">
</details>


#### Followers Model
- Stores the followers and following of Profiles.

| **Name** | **Field Type** | **Validation** |
|-------------|------------|---------------------|
| owner | ForeignKey | User, related_name='following', on_delete=models.CASCADE | 
| followed | ForeignKey | User, related_name='followed', on_delete=models.CASCADE |
| created_at | DateTimeField | auto_now_add=True |

- Owner is a ForeignKey field that has a ManyToOne relationship from Follower to User. This means that each follower is associated with one user, but each user can have multiple followers.
- Followed is a ForeignKey that creates a ManyToOne relationship from Follower to User. This means that each follower is associated with the user they are following, but each user can be followed by multiple users.
- Created_at is a DateTimeField that automatically sets the time and date when created.


<details>
<summary>Model image</summary>
<img src="documentation/testing/validation/python/followers/models.png">
</details>


#### Information Model
- Stores each information object created by the users.

| **Name** | **Field Type** | **Validation** |
|-------------|------------|---------------------|
| owner | ForeignKey | User, on_delete=models.CASCADE | 
| start_date | DateField | |
| end_date | DateField | |
| updated_on | DateTimeField | auto_now=True |
| created_on | DateTimeField | auto_now_add=True |
| text | TextField |  |

- Owner has a OneToOne relationship with the User model. If the User object is deleted also deletes the information object that has the Foreign Key.
- Start_date is a DateField that stores the start date of the the information. This field does not allow for blank values.
- End_date is a DateField that stores the end date of the the information. This field does not allow for blank values.
- Updated_on is a DateTimeField that automatically sets the time and date when updated.
- Created_on is a DateTimeField that automatically sets the time and date when created.
- Text is a TextField that stores the content of the information. This field does not allow for blank values.


<details>
<summary>Model image</summary>
<img src="documentation/testing/validation/python/information/models.png">
</details>


#### Likes Model
- Stores each like on a post by the users.

| **Name** | **Field Type** | **Validation** |
|-------------|------------|---------------------|
| owner | ForeignKey | User, on_delete=models.CASCADE |
| post | ForeignKey | Post, related_name='likes', on_delete=models.CASCADE |
| created_at | DateTimeField | auto_now_add=True |

- Owner is a ForeignKey that has a OneToOne relationship with the User model. If the User object is deleted also deletes the like object that has the Foreign Key.
- Post is a ForeignKey that has a OneToOne relationship with the Post model. This means that each like is associated with one Post, however one Post can have multiple likes.
- Created_at is a DateTimeField that automatically sets the time and date when created.


<details>
<summary>Model image</summary>
<img src="documentation/testing/validation/python/likes/models.png">
</details>


#### Posts Model
- Stores each post created by the users.

| **Name** | **Field Type** | **Validation** |
|-------------|------------|---------------------|
| owner | ForeignKey | User, on_delete=models.CASCADE |
| created_at | DateTimeField | auto_now_add=True |
| updated_at | DateTimeField | auto_now=True |
| title | CharField | max_length=255 |
| description | TextField | max_length=255 |
| content | TextField | max_length=255 |
| image | ImageField | upload_to='images/', default='../default_image' |

- Owner is a ForeignKey that has a OneToMany relationship with the User model. This means that each post is associated with one user, but one user can have multiple posts.
- Created_at is a DateTimeField that is automatically set to the date and time of when the post was created.
- Updated_at is a DateTimeField that is automatically set to the date and time of when the post is updated.
- Title is a CharField that contains the title of the post, with a max allowed 255 characters.
- Description is a TextField that contains the description of a post, with a max allowed 255 characters.
- Content is a TextField that contains the content of a post, with a max allowed 255 characters.
- Image is an ImageField, that contains the users uploaded image, as a fallback the default image will be displayed.

<details>
<summary>Model image</summary>
<img src="documentation/testing/validation/python/posts/models.png">
</details>


#### Tickets Model
- Stores each ticket created by the users.

| **Name** | **Field Type** | **Validation** |
|-------------|------------|---------------------|
| owner | ForeignKey | User, on_delete=models.CASCADE |
| updated_on | DateField | auto_now=True |
| created_on | DateField | auto_now_add=True |
| subject | TextField |  |
| message | TextField |  |
| ticket_status | IntegerField | choices=TICKET_STATUS, default=0 |

- Owner is a ForeignKey that has a OneToMany relationship with the User model. This means that each ticket is associated with a User, but a User can have multiple tickets.
- Updated_on is a DateField that is automatically set to the Date of when the ticket was updated.
- Created_on is a DateField that is automatically set to the Date of when the ticket was created.
- Subject is a TextField that holds the tickets Subject. This field does not allow for blank values.
- Message is a TextField that holds the tickets Message. This field does not allow for blank values.
- Ticket_status is an IntegerField that stores the status of each ticket. The multiple choices stands for different status of each ticket, with the default set to 0. Each number represents a string of readable status for the user.

    - TICKET_STATUS = ((0, "Awaiting review"), (1, "Reviewed"), (2, "Closed"))


<details>
<summary>Model image</summary>
<img src="documentation/testing/validation/python/tickets/models.png">
</details>

--- 
## Testing

### Code Validation

### Python
I have separated the validation files by each app to make it easier to find.

All python files has been validated and shows no errors.

The env.py file has too long lines, but since those are links, I have accepted those as being too long.

### Comments
<details>
<summary>apps.py</summary>
<img src="documentation/testing/validation/python/comments/apps.png">
</details>
<details>
<summary>models.py</summary>
<img src="documentation/testing/validation/python/comments/models.png">
</details>
<details>
<summary>serializers.py</summary>
<img src="documentation/testing/validation/python/comments/serializers.png">
</details>
<details>
<summary>urls.py</summary>
<img src="documentation/testing/validation/python/comments/urls.png">
</details>
<details>
<summary>views.py</summary>
<img src="documentation/testing/validation/python/comments/views.png">
</details>


### drf_api

<details>
<summary>permissions.py</summary>
<img src="documentation/testing/validation/python/drf_api/permissions.png">
</details>
<details>
<summary>serializers.py</summary>
<img src="documentation/testing/validation/python/drf_api/serializers.png">
</details>
<details>
<summary>settings.py</summary>
<img src="documentation/testing/validation/python/drf_api/settings.png">
</details>
<details>
<summary>urls.py</summary>
<img src="documentation/testing/validation/python/drf_api/urls.png">
</details>
<details>
<summary>views.py</summary>
<img src="documentation/testing/validation/python/drf_api/views.png">
</details>


### followers

<details>
<summary>apps.py</summary>
<img src="documentation/testing/validation/python/followers/apps.png">
</details>
<details>
<summary>models.py</summary>
<img src="documentation/testing/validation/python/followers/models.png">
</details>
<details>
<summary>serializers.py</summary>
<img src="documentation/testing/validation/python/followers/serializers.png">
</details>
<details>
<summary>urls.py</summary>
<img src="documentation/testing/validation/python/followers/urls.png">
</details>
<details>
<summary>views.py</summary>
<img src="documentation/testing/validation/python/followers/views.png">
</details>


### information

<details>
<summary>apps.py</summary>
<img src="documentation/testing/validation/python/information/apps.png">
</details>
<details>
<summary>models.py</summary>
<img src="documentation/testing/validation/python/information/models.png">
</details>
<details>
<summary>serializers.py</summary>
<img src="documentation/testing/validation/python/information/serializers.png">
</details>
<details>
<summary>urls.py</summary>
<img src="documentation/testing/validation/python/information/urls.png">
</details>
<details>
<summary>views.py</summary>
<img src="documentation/testing/validation/python/information/views.png">
</details>


### likes

<details>
<summary>apps.py</summary>
<img src="documentation/testing/validation/python/likes/apps.png">
</details>
<details>
<summary>models.py</summary>
<img src="documentation/testing/validation/python/likes/models.png">
</details>
<details>
<summary>serializers.py</summary>
<img src="documentation/testing/validation/python/likes/serializers.png">
</details>
<details>
<summary>urls.py</summary>
<img src="documentation/testing/validation/python/likes/urls.png">
</details>
<details>
<summary>views.py</summary>
<img src="documentation/testing/validation/python/likes/views.png">
</details>


### posts

<details>
<summary>apps.py</summary>
<img src="documentation/testing/validation/python/posts/apps.png">
</details>
<details>
<summary>models.py</summary>
<img src="documentation/testing/validation/python/posts/models.png">
</details>
<details>
<summary>serializers.py</summary>
<img src="documentation/testing/validation/python/posts/serializers.png">
</details>
<details>
<summary>urls.py</summary>
<img src="documentation/testing/validation/python/posts/urls.png">
</details>
<details>
<summary>views.py</summary>
<img src="documentation/testing/validation/python/posts/views.png">
</details>


### profiles

<details>
<summary>apps.py</summary>
<img src="documentation/testing/validation/python/profiles/apps.png">
</details>
<details>
<summary>models.py</summary>
<img src="documentation/testing/validation/python/profiles/models.png">
</details>
<details>
<summary>serializers.py</summary>
<img src="documentation/testing/validation/python/profiles/serializers.png">
</details>
<details>
<summary>urls.py</summary>
<img src="documentation/testing/validation/python/profiles/urls.png">
</details>
<details>
<summary>views.py</summary>
<img src="documentation/testing/validation/python/profiles/views.png">
</details>


### root

<details>
<summary>settings.py</summary>
<img src="documentation/testing/validation/python/root/manage.png">
</details>
<details>
<summary>env.py</summary>
<img src="documentation/testing/validation/python/root/env.png">
</details>


### tickets
<details>
<summary>apps.py</summary>
<img src="documentation/testing/validation/python/tickets/apps.png">
</details>
<details>
<summary>models.py</summary>
<img src="documentation/testing/validation/python/tickets/models.png">
</details>
<details>
<summary>serializers.py</summary>
<img src="documentation/testing/validation/python/tickets/serializers.png">
</details>
<details>
<summary>urls.py</summary>
<img src="documentation/testing/validation/python/tickets/urls.png">
</details>
<details>
<summary>views.py</summary>
<img src="documentation/testing/validation/python/tickets/views.png">
</details>


---


## Manual Testing
The manual testing is done by going to the deployed site, and adding "/api/" then the page you want to see data from. 

For example, to view all profiles in a list:
    - https://pro5-aeecc7322fbc.herokuapp.com/api/profiles/

1. Profiles

| **Feature** | **Action** | **Expected result** | **Pass/Fail** |
|-------------|------------|---------------------|-------------------|
| View all profiles | Add "/profiles" to the URL. | All profiles are displayed in a list. | :heavy_check_mark: |
| View a specific profile | Add "/profiles/id" to the URL. | All profiles are displayed in a list. | :heavy_check_mark: |
| Change Username | Add "/profiles/id" to the URL. | Owner field has been updated with the new Username. | :heavy_check_mark: |
| Change Bio(content) | Add "/profiles/id" to the URL. | Content field has been updated with the new Content. | :heavy_check_mark: |
| Change Name | Add "/profiles/id" to the URL. | Name field has been updated with the new Name. | :heavy_check_mark: |
| Remove Name | Add "/profiles/id" to the URL. | Name field has been updated and contains no Name. | :heavy_check_mark: |
| Change profile image | Add "/profiles/id" to the URL. | Image link has been updated with the new image link. | :heavy_check_mark: |
| Follow a profile | Add "/profiles/id" to the URL. | Following_Count has been increased with 1. | :heavy_check_mark: |
| Unfollow a profile | Add "/profiles/id" to the URL. | Following_Count has been decreased with 1. | :heavy_check_mark: |
| Create a post | Add "/profiles/id" to the URL. | Posts_count has been increased with 1. | :heavy_check_mark: |
| Delete a post | Add "/profiles/id" to the URL. | Posts_count has been decreased with 1. | :heavy_check_mark: |
| View an profile that is not yours | Add "/profiles/id" to the URL. | is_owner field is False. | :heavy_check_mark: |
| View a profile that is yours as signed In. | Add "/profiles/id" to the URL. | is_owner field is True. | :heavy_check_mark: |
| View a profile that is yours as signed Out. | Add "/profiles/id" to the URL. | is_owner field is False. | :heavy_check_mark: |


<details>
<summary>Profiles list</summary>
<img src="documentation/testing/images/profiles_list.png">
</details>
<details>
<summary>Profile ID</summary>
<img src="documentation/testing/images/profile_id.png">
</details>


2. Posts

| **Feature** | **Action** | **Expected result** | **Pass/Fail** |
|-------------|------------|---------------------|-------------------|
| View all posts | Add "/posts" to the URL. | All posts are displayed in a list. | :heavy_check_mark: |
| View a specific post | Add "/posts/ID" to the URL. | The specific post is displayed. | :heavy_check_mark: |
| View a specific post you own | Add "/posts/ID" to the URL. | Is_owner is set to True. | :heavy_check_mark: |
| View a specific post you don't own | Add "/posts/ID" to the URL. | Is_owner is set to False. | :heavy_check_mark: |
| Change title of a post | Add "/posts/ID" to the URL. | The Title is updated. | :heavy_check_mark: |
| Change description of a post | Add "/posts/ID" to the URL. | The description is updated. | :heavy_check_mark: |
| Change content of a post | Add "/posts/ID" to the URL. | The Content is updated. | :heavy_check_mark: |
| Change image of a post | Add "/posts/ID" to the URL. | The image url is updated. | :heavy_check_mark: |
| Like a post | Add "/posts/ID" to the URL. | Likes_count is increased by 1. | :heavy_check_mark: |
| Like a post | Add "/posts/ID" to the URL. | Like_id is set. | :heavy_check_mark: |
| Unlike a post | Add "/posts/ID" to the URL. | Like_id is set to Null. | :heavy_check_mark: |
| Unlike a post | Add "/posts/ID" to the URL. | Likes_count is decreased by 1. | :heavy_check_mark: |
| Comment on a post | Add "/posts/ID" to the URL. | Comments_count is increased by 1. | :heavy_check_mark: |
| Delete comment on a post | Add "/posts/ID" to the URL. | Comments_count is decreased by 1. | :heavy_check_mark: |
| Update a post | Add "/posts/ID" to the URL. | Updated_at updates to todays date. | :heavy_check_mark: |
| Delete a post | Add "/posts/ID" to the URL. | "Detail not found" is displayed and the post is gone. | :heavy_check_mark: |

<details>
<summary>Post list</summary>
<img src="documentation/testing/images/post_list.png">
</details>
<details>
<summary>Post ID</summary>
<img src="documentation/testing/images/post_id.png">
</details>


3. Comments

| **Feature** | **Action** | **Expected result** | **Pass/Fail** |
|-------------|------------|---------------------|-------------------|
| View all Comments | Add "/comments" to the URL. | All Comments are displayed in a list. | :heavy_check_mark: |
| View a specific Comment | Add "/comments/ID" to the URL. | The specific comment is displayed. | :heavy_check_mark: |
| View a specific Comment that you created | Add "/comments/ID" to the URL. | Is_owner is set to True | :heavy_check_mark: |
| View a specific Comment that you did not create | Add "/comments/ID" to the URL. | Is_owner is set to False | :heavy_check_mark: |
| View a profile ID of creator of the post | Add "/comments/ID" to the URL. | Profile_ID is displaying the Profile ID of the creator of the post | :heavy_check_mark: |
| Update a specific Comment | Add "/comments/ID" to the URL. | Updated_at is updated. | :heavy_check_mark: |
| Update a specific Comments content | Add "/comments/ID" to the URL. | The content is updated. | :heavy_check_mark: |
| Update a specific Comments content | Add "/comments/ID" to the URL. | The content is updated. | :heavy_check_mark: |
| Delete a comment | Add "/comments/ID" to the URL. | "Detail not found" is displayed and the comment is gone. | :heavy_check_mark: |


<details>
<summary>Comment list</summary>
<img src="documentation/testing/images/comment_list.png">
</details>
<details>
<summary>Comment ID</summary>
<img src="documentation/testing/images/comment_id.png">
</details>


4. Information

| **Feature** | **Action** | **Expected result** | **Pass/Fail** |
|-------------|------------|---------------------|-------------------|
| View all Information objects | Add "/information" to the URL. | All Information objects are displayed in a list. | :heavy_check_mark: |
| View a specific Information object | Add "/information/ID" to the URL. | The specific object is displayed. | :heavy_check_mark: |
| View a specific Information object that you created | Add "/information/ID" to the URL. | Is_owner is set to True | :heavy_check_mark: |
| View a specific Information object that you did not create | Add "/information/ID" to the URL. | Is_owner is set to False | :heavy_check_mark: |
| Update an information object | Add "/comments/ID" to the URL. | Updated_at is updated with todays date. | :heavy_check_mark: |
| Update the start_date | Add "/comments/ID" to the URL. | Start_date is updated with the new date. | :heavy_check_mark: |
| Update the end_date | Add "/comments/ID" to the URL. | End_date is updated with the new date. | :heavy_check_mark: |
| Update the text | Add "/comments/ID" to the URL. | The Text is updated with the new text. | :heavy_check_mark: |
| Delete a information object | Add "/comments/ID" to the URL. | "Detail not found" is displayed and the information object is gone. | :heavy_check_mark: |


<details>
<summary>Information list</summary>
<img src="documentation/testing/images/comment_list.png">
</details>
<details>
<summary>Information ID</summary>
<img src="documentation/testing/images/comment_id.png">
</details>

5. Tickets/Contactform
- For tickets I am only able to display a list of the tickets made by the user I am currently signed in as.

| **Feature** | **Action** | **Expected result** | **Pass/Fail** |
|-------------|------------|---------------------|-------------------|
| View all Tickets in a list | Add "/tickets" to the URL. | All Tickets made by the signed in user are displayed in a list. | :heavy_check_mark: |
| View a specific Tickets | Add "/tickets" to the URL. | The specific Ticket is displayed | :heavy_check_mark: |
| View a specific Ticket that you created | Add "/tickets/ID" to the URL. | Is_owner is set to True | :heavy_check_mark: |
| Update a Ticket | Add "/tickets/ID" to the URL. | Updated_on is updated with todays date. | :heavy_check_mark: |
| Update the Subject | Add "/tickets/ID" to the URL. | The Subject is updated with the new text. | :heavy_check_mark: |
| Update the Message | Add "/tickets/ID" to the URL. | The Message is updated with the new text. | :heavy_check_mark: |
| Delete a Ticket | Add "/tickets/ID" to the URL. | "Detail not found" is displayed and the Ticket is gone. | :heavy_check_mark: |


<details>
<summary>Ticket list</summary>
<img src="documentation/testing/images/ticket_list.png">
</details>
<details>
<summary>Ticket ID</summary>
<img src="documentation/testing/images/ticket_id.png">
</details>



---
## Bugs

| **Bug** | **Solution** |
|-------------|------------|
| When testing, I could not display all tickets from all users in a list, but only the user I was signed in as. | No errors or problem caused by this. Everything works as expected on the website and all tickets are saved to each user and to the server. |


---

### Modules/ Packages used:
Most important packages:
- django: Python web framework used to develop the site.
- psycopg2: PostgreSQL database for the Python programming lanugage.
- dj3-cloudinary-storage: Integrates Cloudinary with Django Storage API.
- django-allauth: Integrates user authentication aswell as 3rd party account authientication such as facebook and other social accounts.
- Gunicorn: Gunicorn is a pure-Python HTTP server for WSGI applications.

<details>
<summary>All packages</summary>
<img src="">
</details>


---
## Deployment

The deployment guidelines can be found in the [Deployment Readme](https://github.com/gStarhigh/pro5/blob/main/Deployment_README.md).
