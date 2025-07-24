# FoundationFM Backend API Documentation

---

## Common Headers

All requests must include:

```http
Accept: application/json
Content-Type: application/json
```

**Authentication:**  
All routes require a Bearer token in the `Authorization` header, except for **Registration**, **Login**, and **Contact Messages**.

```http
Authorization: Bearer <JWT>
```

---

## Authentication

### Registration

**POST** `http://localhost:1337/api/auth/local/register`

_No authentication required._

**Headers:**
```
Accept: application/json
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "username": "leengari",
  "password": "securePassword",
  "photoUrl": "https://images.unsplash.com/photo-1466112928291-0903b80a9466?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}
```

**Response:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUzMzQ3NzQ0LCJleHAiOjE3NTU5Mzk3NDR9.s_h1qhzpUH9vlDTnCtz3mzcKjIDN7_FkL9OVsivG3JM",
  "user": {
    "id": 1,
    "documentId": "r5fstco716z46tmihd03sg7c",
    "username": "leengari",
    "email": "john@example.com",
    "provider": "local",
    "confirmed": true,
    "blocked": false,
    "createdAt": "2025-07-24T09:02:23.947Z",
    "updatedAt": "2025-07-24T09:02:23.947Z",
    "publishedAt": "2025-07-24T09:02:23.949Z",
    "photoUrl": "https://images.unsplash.com/photo-1466112928291-0903b80a9466?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
}
```

---

### Login

**POST** `http://localhost:1337/api/auth/local`

_No authentication required._

**Headers:**
```
Accept: application/json
Content-Type: application/json
```

**Request Body:**
```json
{
  "identifier": "john@example.com",
  "password": "securePassword"
}
```

**Response:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUzMzQ3ODQwLCJleHAiOjE3NTU5Mzk4NDB9.vhGE4_cxONm4wPGqK-iNG2ARmmCofoXnXXbhluL7q-I",
  "user": {
    "id": 1,
    "documentId": "r5fstco716z46tmihd03sg7c",
    "username": "leengari",
    "email": "john@example.com",
    "provider": "local",
    "confirmed": true,
    "blocked": false,
    "createdAt": "2025-07-24T09:02:23.947Z",
    "updatedAt": "2025-07-24T09:02:23.947Z",
    "publishedAt": "2025-07-24T09:02:23.949Z",
    "photoUrl": "https://images.unsplash.com/photo-1466112928291-0903b80a9466?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
}
```

---

### Invalid Credentials

**Response:**
```json
{
  "data": null,
  "error": {
    "status": 403,
    "name": "ForbiddenError",
    "message": "Forbidden",
    "details": {}
  }
}
```

---

### Unauthenticated Request

**Response:**
```json
{
  "data": null,
  "error": {
    "status": 401,
    "name": "UnauthorizedError",
    "message": "Missing or invalid Authorization header",
    "details": {}
  }
}
```

---

## Newsletter Signup

**POST** `http://localhost:1337/api/newsletter-signups`

**Headers:**
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer <JWT>
```

**Request Body:**
```json
{
  "data": {
    "email": "john@example.com.com",
    "SubscribedAt": "2025-07-24T11:00:00.000Z",
    "user": 1 //user id
  }
}
```

**Response:**
```json
{
  "data": {
    "id": 10,
    "documentId": "al9i2rsb662dxasg8o6kjejn",
    "email": "john@example.com.com",
    "SubscribedAt": "2025-07-24T11:00:00.000Z",
    "createdAt": "2025-07-24T11:11:13.987Z",
    "updatedAt": "2025-07-24T11:11:13.987Z",
    "publishedAt": "2025-07-24T11:11:14.091Z"
  },
  "meta": {}
}
```

---

## Contact Messages

**POST** `http://localhost:1337/api/contact-messages`

_No authentication required._

**Headers:**
```
Accept: application/json
Content-Type: application/json
```

**Request Body (all fields required):**
```json
{
  "data": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello, I am interested in your services."
  }
}
```

**Response:**
```json
{
  "data": {
    "id": 2,
    "documentId": "hz7v2uj055wlxmbeog1q1o1s",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello, I am interested in your services.",
    "createdAt": "2025-07-23T10:36:09.333Z",
    "updatedAt": "2025-07-23T10:36:09.333Z",
    "publishedAt": "2025-07-23T10:36:09.351Z"
  },
  "meta": {}
}
```

---

### Missing Field in Body

**Response:**
```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "name must be a `string` type, but the final value was: `null`.",
    "details": {
      "errors": [
        {
          "path": ["name"],
          "message": "name must be a `string` type, but the final value was: `null`.",
          "name": "ValidationError",
          "value": null
        }
      ]
    }
  }
}
```

---

## Categories

**GET** `http://localhost:1337/api/categories`

**Headers:**
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer <JWT>
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "al4c0hhjx39hj89vbwaidph2",
      "name": "news",
      "slug": "news",
      "createdAt": "2025-07-19T17:29:52.273Z",
      "updatedAt": "2025-07-19T17:29:52.273Z",
      "publishedAt": "2025-07-19T17:29:52.257Z"
    },
    {
      "id": 2,
      "documentId": "snjzhbbyn86atq0jegfr7kb0",
      "name": "tech",
      "slug": "tech",
      "createdAt": "2025-07-19T17:29:52.448Z",
      "updatedAt": "2025-07-19T17:29:52.448Z",
      "publishedAt": "2025-07-19T17:29:52.440Z"
    },
    {
      "id": 3,
      "documentId": "tmx4xvyxw0xrbq5exyb4bhtr",
      "name": "food",
      "slug": "food",
      "createdAt": "2025-07-19T17:29:52.731Z",
      "updatedAt": "2025-07-19T17:29:52.731Z",
      "publishedAt": "2025-07-19T17:29:52.724Z"
    },
    {
      "id": 4,
      "documentId": "pzd1vjh4e691xwriqbqjsolc",
      "name": "nature",
      "slug": "nature",
      "createdAt": "2025-07-19T17:29:52.880Z",
      "updatedAt": "2025-07-19T17:29:52.880Z",
      "publishedAt": "2025-07-19T17:29:52.871Z"
    },
    {
      "id": 5,
      "documentId": "x8scf7ben49vwresbj0qj503",
      "name": "story",
      "slug": "story",
      "createdAt": "2025-07-19T17:29:53.044Z",
      "updatedAt": "2025-07-19T17:29:53.044Z",
      "publishedAt": "2025-07-19T17:29:53.038Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 5
    }
  }
}
```

---

## Articles

### Fetch All Articles (with author, category, cover)

**GET** `http://localhost:1337/api/articles?populate[0]=author&populate[1]=category&populate[2]=cover`

**Headers:**
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer <JWT>
```

**Response:**
```json
{
   "data": [
       {
           "id": 10,
           "documentId": "w15v5jlqx757hbkx0iwy4zja",
           "title": "A bug is becoming a meme on the internet",
           "description": "How a bug on MySQL is becoming a meme on the internet",
           "slug": "a-bug-is-becoming-a-meme-on-the-internet",
           "createdAt": "2025-07-19T17:30:04.274Z",
           "updatedAt": "2025-07-23T13:43:52.740Z",
           "publishedAt": "2025-07-23T13:43:52.782Z",
           "excerpt": null,
           "type": null,
           "author": {
               "id": 2,
               "documentId": "xxkpxrynry4xgy4c70aazsoj",
               "name": "Sarah Baker",
               "email": "sarahbaker@strapi.io",
               "createdAt": "2025-07-19T17:29:55.731Z",
               "updatedAt": "2025-07-19T17:29:55.731Z",
               "publishedAt": "2025-07-19T17:29:55.721Z"
           },
           "category": {
               "id": 2,
               "documentId": "snjzhbbyn86atq0jegfr7kb0",
               "name": "tech",
               "slug": "tech",
               "createdAt": "2025-07-19T17:29:52.448Z",
               "updatedAt": "2025-07-19T17:29:52.448Z",
               "publishedAt": "2025-07-19T17:29:52.440Z"
           },
           "cover": {
               "id": 7,
               "documentId": "w2r9orb7qe9hwla534ks7a8i",
               "name": "a-bug-is-becoming-a-meme-on-the-internet",
               "alternativeText": "An image uploaded to Strapi called a-bug-is-becoming-a-meme-on-the-internet",
               "caption": "a-bug-is-becoming-a-meme-on-the-internet",
               "width": 3628,
               "height": 2419,
               "formats": {
                   "thumbnail": {
                       "name": "thumbnail_a-bug-is-becoming-a-meme-on-the-internet",
                       "hash": "thumbnail_a_bug_is_becoming_a_meme_on_the_internet_36154572f4",
                       "ext": ".jpeg",
                       "mime": "image/jpeg",
                       "path": null,
                       "width": 234,
                       "height": 156,
                       "size": 6.73,
                       "sizeInBytes": 6728,
                       "url": "/uploads/thumbnail_a_bug_is_becoming_a_meme_on_the_internet_36154572f4.jpeg"
                   },
                   "large": {
                       "name": "large_a-bug-is-becoming-a-meme-on-the-internet",
                       "hash": "large_a_bug_is_becoming_a_meme_on_the_internet_36154572f4",
                       "ext": ".jpeg",
                       "mime": "image/jpeg",
                       "path": null,
                       "width": 1000,
                       "height": 666,
                       "size": 50.97,
                       "sizeInBytes": 50972,
                       "url": "/uploads/large_a_bug_is_becoming_a_meme_on_the_internet_36154572f4.jpeg"
                   },
                   "medium": {
                       "name": "medium_a-bug-is-becoming-a-meme-on-the-internet",
                       "hash": "medium_a_bug_is_becoming_a_meme_on_the_internet_36154572f4",
                       "ext": ".jpeg",
                       "mime": "image/jpeg",
                       "path": null,
                       "width": 750,
                       "height": 500,
                       "size": 33.59,
                       "sizeInBytes": 33590,
                       "url": "/uploads/medium_a_bug_is_becoming_a_meme_on_the_internet_36154572f4.jpeg"
                   },
                   "small": {
                       "name": "small_a-bug-is-becoming-a-meme-on-the-internet",
                       "hash": "small_a_bug_is_becoming_a_meme_on_the_internet_36154572f4",
                       "ext": ".jpeg",
                       "mime": "image/jpeg",
                       "path": null,
                       "width": 500,
                       "height": 333,
                       "size": 19.25,
                       "sizeInBytes": 19245,
                       "url": "/uploads/small_a_bug_is_becoming_a_meme_on_the_internet_36154572f4.jpeg"
                   }
               },
               "hash": "a_bug_is_becoming_a_meme_on_the_internet_36154572f4",
               "ext": ".jpeg",
               "mime": "image/jpeg",
               "size": 234.02,
               "url": "/uploads/a_bug_is_becoming_a_meme_on_the_internet_36154572f4.jpeg",
               "previewUrl": null,
               "provider": "local",
               "provider_metadata": null,
               "createdAt": "2025-07-19T17:30:04.104Z",
               "updatedAt": "2025-07-19T17:30:04.104Z",
               "publishedAt": "2025-07-19T17:30:04.105Z"
           }
       }
   ],
   "meta": {
       "pagination": {
           "page": 1,
           "pageSize": 25,
           "pageCount": 1,
           "total": 1
       }
   }
}

```

---

### Search Articles

**GET** `http://localhost:1337/api/articles?filters[title][$containsi]=beautiful&populate[0]=category&populate[1]=author&populate[2]=cover`

**Headers:**
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer <JWT>
```

**Response:**
```json
{
 "data": [
       {
           "id": 11,
           "documentId": "sqexxzhj4qjvvzws2do3mw0f",
           "title": "Beautiful picture",
           "description": "Description of a beautiful picture",
           "slug": "beautiful-picture",
           "createdAt": "2025-07-19T17:30:05.867Z",
           "updatedAt": "2025-07-23T15:20:48.619Z",
           "publishedAt": "2025-07-23T15:20:48.766Z",
           "excerpt": null,
           "type": null,
           "category": {
               "id": 4,
               "documentId": "pzd1vjh4e691xwriqbqjsolc",
               "name": "nature",
               "slug": "nature",
               "createdAt": "2025-07-19T17:29:52.880Z",
               "updatedAt": "2025-07-19T17:29:52.880Z",
               "publishedAt": "2025-07-19T17:29:52.871Z"
           },
           "author": {
               "id": 2,
               "documentId": "xxkpxrynry4xgy4c70aazsoj",
               "name": "Sarah Baker",
               "email": "sarahbaker@strapi.io",
               "createdAt": "2025-07-19T17:29:55.731Z",
               "updatedAt": "2025-07-19T17:29:55.731Z",
               "publishedAt": "2025-07-19T17:29:55.721Z"
           },
           "cover": {
               "id": 8,
               "documentId": "ssul13lwh3k14u213cxkv2lm",
               "name": "beautiful-picture",
               "alternativeText": "An image uploaded to Strapi called beautiful-picture",
               "caption": "beautiful-picture",
               "width": 3824,
               "height": 2548,
               "formats": {
                   "thumbnail": {
                       "name": "thumbnail_beautiful-picture",
                       "hash": "thumbnail_beautiful_picture_9cccb3e2e8",
                       "ext": ".jpeg",
                       "mime": "image/jpeg",
                       "path": null,
                       "width": 234,
                       "height": 156,
                       "size": 6.44,
                       "sizeInBytes": 6436,
                       "url": "/uploads/thumbnail_beautiful_picture_9cccb3e2e8.jpeg"
                   },
                   "medium": {
                       "name": "medium_beautiful-picture",
                       "hash": "medium_beautiful_picture_9cccb3e2e8",
                       "ext": ".jpeg",
                       "mime": "image/jpeg",
                       "path": null,
                       "width": 750,
                       "height": 500,
                       "size": 47.81,
                       "sizeInBytes": 47812,
                       "url": "/uploads/medium_beautiful_picture_9cccb3e2e8.jpeg"
                   },
                   "small": {
                       "name": "small_beautiful-picture",
                       "hash": "small_beautiful_picture_9cccb3e2e8",
                       "ext": ".jpeg",
                       "mime": "image/jpeg",
                       "path": null,
                       "width": 500,
                       "height": 333,
                       "size": 23.35,
                       "sizeInBytes": 23351,
                       "url": "/uploads/small_beautiful_picture_9cccb3e2e8.jpeg"
                   },
                   "large": {
                       "name": "large_beautiful-picture",
                       "hash": "large_beautiful_picture_9cccb3e2e8",
                       "ext": ".jpeg",
                       "mime": "image/jpeg",
                       "path": null,
                       "width": 1000,
                       "height": 666,
                       "size": 83.36,
                       "sizeInBytes": 83355,
                       "url": "/uploads/large_beautiful_picture_9cccb3e2e8.jpeg"
                   }
               },
               "hash": "beautiful_picture_9cccb3e2e8",
               "ext": ".jpeg",
               "mime": "image/jpeg",
               "size": 710.28,
               "url": "/uploads/beautiful_picture_9cccb3e2e8.jpeg",
               "previewUrl": null,
               "provider": "local",
               "provider_metadata": null,
               "createdAt": "2025-07-19T17:30:05.681Z",
               "updatedAt": "2025-07-19T17:30:05.681Z",
               "publishedAt": "2025-07-19T17:30:05.682Z"
           }
       }
   ],
   "meta": {
       "pagination": {
           "page": 1,
           "pageSize": 25,
           "pageCount": 1,
           "total": 1
       }
   }
}


```

---

### Fetch Single Article (with comments, author, cover, category)

**GET**  
`http://localhost:1337/api/articles/sqexxzhj4qjvvzws2do3mw0f?populate[comments][populate][0]=replies&populate[comments][populate][1]=profile&populate[comments][populate][2]=parent&populate[comments][populate][3]=replies.profile&populate[cover]=true&populate[author]=true&populate[category]=true`

**Headers:**
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer <JWT>
```

**Response:**
```json
{
   "data": {
       "id": 15,
       "documentId": "sqexxzhj4qjvvzws2do3mw0f",
       "title": "Beautiful picture",
       "description": "Description of a beautiful picture",
       "slug": "beautiful-picture",
       "createdAt": "2025-07-19T17:30:05.867Z",
       "updatedAt": "2025-07-23T15:32:25.134Z",
       "publishedAt": "2025-07-23T15:32:25.165Z",
       "excerpt": "asdadasd",
       "type": "Blog",
       "comments": [
           {
               "id": 6,
               "documentId": "jz2av0exb3p7atjeeqrnuxo5",
               "createdAt": "2025-07-23T15:32:06.911Z",
               "updatedAt": "2025-07-23T15:32:06.911Z",
               "publishedAt": "2025-07-23T15:32:06.988Z",
               "Content": "comment onw",
               "likes": null,
               "dislikes": null,
               "replies": [
                   {
                       "id": 8,
                       "documentId": "d7pwbp8p89xwrk6ncm4fjf59",
                       "createdAt": "2025-07-23T15:33:40.252Z",
                       "updatedAt": "2025-07-23T15:33:40.252Z",
                       "publishedAt": "2025-07-23T15:33:40.283Z",
                       "Content": "reply one",
                       "likes": null,
                       "dislikes": null,
                       "profile": {
                           "id": 4,
                           "documentId": "nrf0e7b01by2lt4qbgqga033",
                           "name": "Baraka Ngari",
                           "email": "leengari99@gmail.com",
                           "uid": "669950c1-e6af-4954-8101-5f242ae0e9bc",
                           "photoUrl": "https://images.unsplash.com/photo-1466112928291-0903b80a9466?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                           "createdAt": "2025-07-23T08:41:10.286Z",
                           "updatedAt": "2025-07-23T08:41:10.286Z",
                           "publishedAt": "2025-07-23T08:41:10.453Z"
                       }
                   }
               ],
               "profile": {
                   "id": 2,
                   "documentId": "d7ummlu5d2u2qz2mbwi331lb",
                   "name": "Lee Ngari",
                   "email": "leengari76@gmail.com",
                   "uid": "UOGduO4E2mgO2yMKz2vELaIlkFE3",
                   "photoUrl": "https://images.unsplash.com/photo-1466112928291-0903b80a9466?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                   "createdAt": "2025-07-21T09:21:20.358Z",
                   "updatedAt": "2025-07-21T09:21:20.358Z",
                   "publishedAt": "2025-07-21T09:21:20.471Z"
               },
               "parent": null
           },
           {
               "id": 8,
               "documentId": "d7pwbp8p89xwrk6ncm4fjf59",
               "createdAt": "2025-07-23T15:33:40.252Z",
               "updatedAt": "2025-07-23T15:33:40.252Z",
               "publishedAt": "2025-07-23T15:33:40.283Z",
               "Content": "reply one",
               "likes": null,
               "dislikes": null,
               "replies": [],
               "profile": {
                   "id": 4,
                   "documentId": "nrf0e7b01by2lt4qbgqga033",
                   "name": "Baraka Ngari",
                   "email": "leengari99@gmail.com",
                   "uid": "669950c1-e6af-4954-8101-5f242ae0e9bc",
                   "photoUrl": "https://images.unsplash.com/photo-1466112928291-0903b80a9466?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                   "createdAt": "2025-07-23T08:41:10.286Z",
                   "updatedAt": "2025-07-23T08:41:10.286Z",
                   "publishedAt": "2025-07-23T08:41:10.453Z"
               },
               "parent": {
                   "id": 6,
                   "documentId": "jz2av0exb3p7atjeeqrnuxo5",
                   "createdAt": "2025-07-23T15:32:06.911Z",
                   "updatedAt": "2025-07-23T15:32:06.911Z",
                   "publishedAt": "2025-07-23T15:32:06.988Z",
                   "Content": "comment onw",
                   "likes": null,
                   "dislikes": null
               }
           }
       ],
       "cover": {
           "id": 8,
           "documentId": "ssul13lwh3k14u213cxkv2lm",
           "name": "beautiful-picture",
           "alternativeText": "An image uploaded to Strapi called beautiful-picture",
           "caption": "beautiful-picture",
           "width": 3824,
           "height": 2548,
           "formats": {
               "thumbnail": {
                   "name": "thumbnail_beautiful-picture",
                   "hash": "thumbnail_beautiful_picture_9cccb3e2e8",
                   "ext": ".jpeg",
                   "mime": "image/jpeg",
                   "path": null,
                   "width": 234,
                   "height": 156,
                   "size": 6.44,
                   "sizeInBytes": 6436,
                   "url": "/uploads/thumbnail_beautiful_picture_9cccb3e2e8.jpeg"
               },
               "medium": {
                   "name": "medium_beautiful-picture",
                   "hash": "medium_beautiful_picture_9cccb3e2e8",
                   "ext": ".jpeg",
                   "mime": "image/jpeg",
                   "path": null,
                   "width": 750,
                   "height": 500,
                   "size": 47.81,
                   "sizeInBytes": 47812,
                   "url": "/uploads/medium_beautiful_picture_9cccb3e2e8.jpeg"
               },
               "small": {
                   "name": "small_beautiful-picture",
                   "hash": "small_beautiful_picture_9cccb3e2e8",
                   "ext": ".jpeg",
                   "mime": "image/jpeg",
                   "path": null,
                   "width": 500,
                   "height": 333,
                   "size": 23.35,
                   "sizeInBytes": 23351,
                   "url": "/uploads/small_beautiful_picture_9cccb3e2e8.jpeg"
               },
               "large": {
                   "name": "large_beautiful-picture",
                   "hash": "large_beautiful_picture_9cccb3e2e8",
                   "ext": ".jpeg",
                   "mime": "image/jpeg",
                   "path": null,
                   "width": 1000,
                   "height": 666,
                   "size": 83.36,
                   "sizeInBytes": 83355,
                   "url": "/uploads/large_beautiful_picture_9cccb3e2e8.jpeg"
               }
           },
           "hash": "beautiful_picture_9cccb3e2e8",
           "ext": ".jpeg",
           "mime": "image/jpeg",
           "size": 710.28,
           "url": "/uploads/beautiful_picture_9cccb3e2e8.jpeg",
           "previewUrl": null,
           "provider": "local",
           "provider_metadata": null,
           "createdAt": "2025-07-19T17:30:05.681Z",
           "updatedAt": "2025-07-19T17:30:05.681Z",
           "publishedAt": "2025-07-19T17:30:05.682Z"
       },
       "author": {
           "id": 2,
           "documentId": "xxkpxrynry4xgy4c70aazsoj",
           "name": "Sarah Baker",
           "email": "sarahbaker@strapi.io",
           "createdAt": "2025-07-19T17:29:55.731Z",
           "updatedAt": "2025-07-19T17:29:55.731Z",
           "publishedAt": "2025-07-19T17:29:55.721Z"
       },
       "category": {
           "id": 4,
           "documentId": "pzd1vjh4e691xwriqbqjsolc",
           "name": "nature",
           "slug": "nature",
           "createdAt": "2025-07-19T17:29:52.880Z",
           "updatedAt": "2025-07-19T17:29:52.880Z",
           "publishedAt": "2025-07-19T17:29:52.871Z"
       }
   },
   "meta": {}
}

```

---

## Comments

### Post Top-Level Comment

**POST** `http://localhost:1337/api/comments`

**Headers:**
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer <JWT>
```

**Request Body:**
```json
{
  "data": {
    "Content": "This is a top-level comment",
    "article": "sqexxzhj4qjvvzws2do3mw0f",
    "user": 1
  }
}
```

**Response:**
```json
{
  "data": {
    "id": 10,
    "documentId": "sft2k9vz6rztvyhvf21xy8wh",
    "createdAt": "2025-07-24T10:59:37.743Z",
    "updatedAt": "2025-07-24T10:59:37.743Z",
    "publishedAt": "2025-07-24T10:59:37.867Z",
    "Content": "This is a top-level comment",
    "likes": null,
    "dislikes": null
  },
  "meta": {}
}
```

---

### Post Reply

**POST** `http://localhost:1337/api/comments`

**Headers:**
```
Accept: application/json
Content-Type: application/json
Authorization: Bearer <JWT>
```

**Request Body:**
```json
{
  "data": {
    "Content": "This is a reply to the top-level comment 222.",
    "parent": "sft2k9vz6rztvyhvf21xy8wh",
    "user": 1,
    "article": "sqexxzhj4qjvvzws2do3mw0f"
  }
}
```

**Response:**
```json
{
  "data": {
    "id": 14,
    "documentId": "ppe5cs3cqt4a7obngel19o6t",
    "createdAt": "2025-07-24T11:04:18.209Z",
    "updatedAt": "2025-07-24T11:04:18.209Z",
    "publishedAt": "2025-07-24T11:04:18.224Z",
    "Content": "This is a reply to the top-level comment 222.",
    "likes": null,
    "dislikes": null
  },
  "meta": {}
}
```

---
