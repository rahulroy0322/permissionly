
# SERVER contract for PERMISSIONLY

## types for resources 

```ts
type RoleType = "super" | "admin" | "moderator" | "user";
type ActionsType = 'view' | 'create' | 'update' | 'delete';

type PostType = {
    title: string;
    slug: string; // id
    content: string;
    desc: string;
    userId: UserType['id'];
    createdAt: string;
    updatedAt: string;
}

type UserType = {
    name: string;
    email: string;
    pass: string | null;
    role: RoleType;
    id: string;
    createdAt: string;
    updatedAt: string;
}

type PermissionType = {
    role: RoleType;
    value: ConditionType | boolean;
    action: ActionsType | null;
    resorce: 'users' | 'permissions' | 'todos' | 'posts' | string | null;
}


// * internal ref only
type LeafType = {
    type: "leaf";
    ref: ConditionRefType;
    op: "check";
} | {
    type: "leaf";
    ref: ConditionRefType;
    op: "eq" | "neq" | "includes" | "notIncludes" | "gt" | "gte" | "lt" | "lte" | "in" | "notIn";
    value: ConditionRefType | string | number | boolean | (`${string}.${string}` & {});
}

type NotType = {
    type: "not";
    leaf: ConditionType;
}

type AndType = {
    type: "and";
    leafs: NotType['leaf'][]
}

type OrType = Pick<AndType, 'leafs'> & {
    type: 'or'
}

type ConditionType = LeafType | NotType | AndType | OrType

```

## Thought Process / Working Principle

### Working Process behind permissionly 

#### if the resorce is null then value if for everything means this role can access(not if false) everything

#### if the resorce is string but action is null then value if for that resorce means this role have access(not if false) to everything to this resorce

#### if the action is there then the action will deside weather this can access or not




# Api from permissionly 

## SETUP
```sh
PRODUCTION URL: <upcoming>
BASE URL: '/api/v1/'
```

### base response type
```sh
[SUCCESS]:
{
    success: true,
    data:{<placeholder>}
}

[ERROR]:
{
    success: false,
    data:Error
}
```

## AUTH

```sh
BASE URL: '/auth'
```

### ROUTES

#### REGISTER

create your account to permissionly

```sh
METHOD [POST]
URL '/register'

BODY {
    name: string;
    email: string;
    password: string;
}

RESPONSE {
    user: UserType
    token: {
        refresh: string
        access: string
    }
}

STATUS CODE 
201 -> created
500 -> server Error
400 -> ZodError/BadError ('Invalid credentials provided!' | 'User Already Exists!')
```

#### LOGIN

login to your account

```sh
METHOD [POST]
URL '/login'

BODY {
    email: string;
    password: string;
}

RESPONSE {
    user: UserType
    token: {
        refresh: string
        access: string
    }
}

STATUS CODE 
202 -> success
500 -> server Error
400 -> ZodError/BadError ('Invalid credentials provided!' | 'invalid mathod of login!' | 'Email or Password is invalid!')
```

#### PROFILE

get your profile details

```sh
METHOD [GET]
URL '/me' | '/profile'

HEADERS {
    Authorization: `Bearer <accessToken>`
}

RESPONSE {
    user: UserType
}

STATUS CODE 
200 -> success
500 -> server Error ('some event dosn\'t handled properly!')
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!')
```

#### TOKEN ACCESS

get your access token againest refresh toke

```sh
METHOD [GET]
URL '/token' | '/refresh'

HEADERS {
    Authorization: `Bearer <refreshToken>`
}

RESPONSE {
    token: {
        refresh?: string # if server deside to refresh refreshToken also
        access: string
    }
}

STATUS CODE 
200 -> success
500 -> server Error ('some event dosn\'t handled properly!')
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!' | 'Invalid Token provided!')
```

## PERMISSION

```sh
BASE URL: '/permission'
```

### ROUTES

#### CREATE PERMISSION  

create your permission to permissionly

```sh
METHOD [POST]
URL '/'

HEADERS {
    Authorization: `Bearer <accessToken>`
}

BODY {
    role: RoleType;
    value: ConditionType | boolean;
    action: ActionsType | null;
    resorce: string | null;
}

RESPONSE {
    permission: PermissionType
}

STATUS CODE 
201 -> created
500 -> server Error
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!')
400 -> ZodError/BadError ('Invalid credentials provided!')
```

#### GET ALL PERMISSION  

get all the permission from permissionly

<mark style="padding: .2em .6em; background:teal; color: white;">Note only from admin url is allowed to req on this url</mark>

```sh
METHOD [GET]
URL '/'

HEADERS {
    Authorization: `Bearer <accessToken>`
}

RESPONSE {
    permissions: PermissionType[]
}

STATUS CODE 
200 -> success
500 -> server Error
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!')
```

#### UPDATE PERMISSION  

update the permission to permissionly

<mark style="padding: .2em .6em; background:teal; color: white;">Note only from admin url is allowed to req on this url</mark>

```sh
METHOD [PATCH]
URL '/:id'

HEADERS {
    Authorization: `Bearer <accessToken>`
}

BODY {
    role: RoleType;
    value: ConditionType | boolean;
    action: ActionsType | null;
    resorce: string | null;
}

RESPONSE {
    permission: PermissionType
}

STATUS CODE 
200 -> success
500 -> server Error
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!' | 'Invalid credentials provided!')
```

#### GET PERMISSION BY ID

get the permission by id from permissionly

<mark style="padding: .2em .6em; background:teal; color: white;">Note only from admin url is allowed to req on this url</mark>

```sh
METHOD [GET]
URL '/:id'

HEADERS {
    Authorization: `Bearer <accessToken>`
}

RESPONSE {
    permission: PermissionType | null # (if not found)
}

STATUS CODE 
200 -> success
500 -> server Error
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!' | 'Invalid credentials provided!')
```

#### GET PERMISSION  

get the permission from permissionly

```sh
METHOD [GET]
URL '/permission'

RESPONSE {
    permission: PermissionType | null # (if not found)
}

STATUS CODE 
200 -> success
500 -> server Error
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!')
400 -> ZodError/BadError ('Invalid credentials provided!')
```

#### DELETE PERMISSION  

delete the permission

<mark style="padding: .2em .6em; background:teal; color: white;">Note only from admin url is allowed to req on this url</mark>

```sh
METHOD [DELETE]
URL '/:id'

RESPONSE {
    message: string
}

STATUS CODE 
200 -> success
500 -> server Error
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!')
```

## POST

```sh
BASE URL: '/post'
```

### ROUTES

#### CREATE POST

create your post

```sh
METHOD [POST]
URL '/'

HEADERS {
    Authorization: `Bearer <accessToken>`
}

BODY {
    title: string;
    slug: string;
    content: string;
    desc: string;
}

RESPONSE {
    post: PostType
}

STATUS CODE 
201 -> created
500 -> server Error
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!')
400 -> ZodError/BadError ('Invalid credentials provided!')
```

#### GET ALL POST  

get all the posts

```sh
METHOD [GET]
URL '/'

HEADERS {
    Authorization: `Bearer <accessToken>`
}

RESPONSE {
    posts: PermissionType[]
}

STATUS CODE 
200 -> success
500 -> server Error
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!')
```

#### GET POST BY SlUG

get the post by slug

```sh
METHOD [GET]
URL '/:id'

HEADERS {
    Authorization: `Bearer <accessToken>`
}

RESPONSE {
    post: PostType | null # (if not found)
}

STATUS CODE 
200 -> success
500 -> server Error
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!' | 'Invalid credentials provided!')
```

#### UPDATE POST  

update the post

```sh
METHOD [PATCH]
URL '/:slug'

HEADERS {
    Authorization: `Bearer <accessToken>`
}

BODY {
    title: string;
    slug: string;
    content: string;
    desc: string;
}

RESPONSE {
    post: PostType
}

STATUS CODE 
200 -> success
500 -> server Error
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!' | 'Invalid credentials provided!')
```

#### DELETE POST  

delete the post

```sh
METHOD [DELETE]
URL '/:slug'

RESPONSE {
    message: string
}

STATUS CODE 
200 -> success
500 -> server Error
401 -> ExpiredError/UnAuthenticatedError ('ExpiredError' | 'Token Required!' | 'Your account had been deleted!')
```

