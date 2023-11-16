# React project (Project Portfolio 5, Advanced FrontEnd) for Code Institute.

## General information


Link to the application: [Click Here!](https://pro5-aeecc7322fbc.herokuapp.com/)



---
## Table of Contents

 - ## [General Information](#general-information)

 - ## [Table of Contents](#table-of-contents-1)

 - ## [User Stories](#user-stories-1)

 - ## [Flowchart](#Flowchart-1)
    
- ## [Testing](#testing-1)
    - ## [Code Validation](#code-validation-1)
    - ## [Manual Testing](#manual-testing-1)
    - ## [Future improvements](#Future-improvements-1)
- ## [Bugs](#Bugs-1)

- ## [Libraries and Software](#Libraries-and-Software-1)



---
# User Stories/Tasks

| **EPIC** | **ID #** | **User Story** | **Github project** |
|-------------|------------|---------------------|---------------------|

---
## Flowchart

#### Database



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





---
## Bugs

| **Bug** | **Solution** |
|-------------|------------|


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
