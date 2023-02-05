# Concepts

- authorization check: a relationship exists between an object and a user.
  - 사용자와 개체들의 관계를 정의하여 권한을 관리할 수 있다.

[구문 형식 2가지](https://openfga.dev/docs/configuration-language#equivalent-zanzibar-concepts):

- JSON: Zanzibar 논문과 비슷한 형식이다.
- DSL: Auth0 FGA Playground에서 사용하기 편한 형식이다.

## Term

### Type, 타입

- a string.
- define a class of objects with similar characteristics.
  - 비슷한 특성을 가진 개체들에게 붙인 이름

examples of types:

- workspace
- repository
- organization
- document

### Type Definition, 타입 정의

- a configuration.
- defines all possible relations a user or another object can have in relation to this type.
  - 모든 사용자와 개체들의 관계를 설정한다.

```dsl
type document
  relations
    define viewer: [user]
    define commenter: [user]
    define editor: [user]
    define owner: [user]
```

### Authorization Model

- a combination of one or more type definitions.
- define the permission model of a system.
  - *타입 정의*들을 모아서 시스템의 권한을 정의한다.
- 권한부여 모델, 허가 모델, 인가 모델, 인증 모델

```dsl
model
  schema 1.1
type document
  relations
    define viewer: [domain#member,user]
    define commenter: [domain#member,user]
    define editor: [domain#member,user]
    define owner: [domain#member,user]
type domain
  relations
    define member: [user]
type user
```

### Store, 저장소

- a OpenFGA entity used for organizing data needed to answer authorization checks.
  - 권한을 확인할 때 필요한 데이터를 정리하는 데 사용된다.
- Each store contains one or more versions of an authroization model and may contains various relationship tuples
  - 각 저장소에는 하나 이상의 권한부여 모델 버전이 포함되어 있다.
    - 다양한 관계 튜플도 포함될 수 있다.
- Store data cannot be shared across stores
  - 권한부여 모델 및 관계 튜플과 같은 저장소 데이터는 저장소 간에 공유할 수 없다.
- store all data in a single store
  - 하나의 저장소에 저장하는 것이 좋다.
- e.g. development/prod, create seperate stores
  - 완전히 별도의 권한 부여 요구 또는 하나의 데이터가 다른 데이터에 영향을 미치지 않아야 하는 격리된 환경(개발/프로덕션)의 경우 별도의 저장소를 생성할 수 있다.

### Object, 개체

- an entity in the system
- a combination of a type and an identifier.
  - 타입과 식별자의 조합으로 나타낼 수 있다.

examples:

- `workspace:fb83c013-3060-41f4-9590-d3233a67938f`
- `repository:auth0/express-jwt`
- `organization:org_ajUc9kJ`
- `document:new-roadmap`

### User, 사용자

- an entity in the system that can be related to an object.
- a combination of a type, an identifier and an optional relation.
  - 개체처럼 타입과 식별자의 조합으로 나타낼 수 있다.
    - 관계도 포함하여 조합할 수 있다.

examples:

- identifier
  - `user:anne`
  - `user:4179af14-f0c0-4930-88fd-5570c7bf6f59`
- object
  - `workspace:fb83c013-3060-41f4-9590-d3233a67938f`
  - `repository:auth0/express-jwt`
  - `organization:org_ajUc9kJ`
- group / userset
  - `organization:org_ajUc9kJ#members`
- everyone
  - `*`

### Relation, 관계

- a string in the type definition of an authorization model
  - 권한부여 모델과 타입 정의를 만들 때 정의된다.

examples:

- User can be a `reader` of a document
- Team can `administer` a repo
- User can be a `member` of a team

### Relation Definition, 관계 정의

- lists the conditions or requirements under which this relationship would be possible.
- 관계가 가능한 조건이나 요구사항을 나열한다.

examples:

```dsl
type document
  relations
    define viewer: [user]
    define commenter: [user]
    define editor: [user]
    define owner: [user]
type user
```

or:

- user `user:anne` is a `editor` of `document:roadmap`
- object `application:ifft` is a `editor` of `document:roadmap`
- userset `organization:auth0.com#member` is a `editor` of `document:roadmap`
- everyone `*` is a `editor` of `document:roadmap`

### Directly Related User Type

- an array specified in the type definition
  - indicate what types of users can be directly related to that relation
- 관계에 관련된 사용자 목록

examples:

```dsl
type document
  relations
    define viewer: [user]
```

- `user:anne` is a viewer of `document:roadmap`
- `user:3f7768e0-4fa7-4e93-8417-4da68ce1846c` is a viewer of `document:roadmap`
- `workspace:auth0` is not a viewer of `document:roadmap`
- `folder:planning#editor` is not a viewer of `document:roadmap`

### Relatioship Tuple

- a tuple (user=X, relation=R, object=Y)

```json
[
  {
    "user": "user:anne",
    "relation": "editor",
    "object": "document:new-roadmap",
  },
]
```

### Relationship

- the realization of a relation between a user and an object
- 사용자와 개체들의 실제 관계

### Direct And Implied Relationships

- direct relationship, 직접적 관계
  - (user=X, relation=R, object=Y)
- implied (or computed) relationship, 암시적, 내재적, 자동계산된 관계
  - (user=X, object=Y) + (user=X, object=Z)
  -

#### Direct Relationships

```json
[
  // Anne of type user is directly related to the document
  {
    "user": "user:anne",
    "relation": "viewer",
    "object": "document:new-roadmap",
  },
]
```

```json
[
  // Everyone (`*`) of type user is directly related to the document
  {
    "user": "*",
    "relation": "viewer",
    "object": "document:new-roadmap",
  },
]
```

```json
[
  // The userset is directly related to this document
  {
    "user": "team:product#member",
    "relation": "viewer",
    "object": "document:new-roadmap",
  },
  // AND Anne of type user is a member of a userset (e.g. team:product#member)
  {
    "user": "user:anne",
    "relation": "member",
    "object": "team:product#member",
  },
]
```

#### Implied Relationships

```dsl
type document
  relations
    define viewer: [user] or editor
    define editor: [user]
```

assume:

```json
[
  {
    "user": "user:anne",
    "relation": "editor",
    "object": "document:new-roadmap",
  },
]
```

pseudocode:

```rs
check(
  "user:anne", // check if the user `user:anne`
  "viewer", // has an `viewer` relation
  "document:new-roadmap", // with the object `document:new-roadmap`
   authorization_id="1uHxCSuTP0VKPYSnkq1pbb1jeZw"
);

Reply: true
```

### Check Request

- a call to the OpenFGA check endpoint that returns whether the user has a certain relationship with an object.
  - OpenFGA에게 사용자가 개체와 관계에 있는지 확인하기 위한 요청

```rs
check(
  "user:anne", // check if the user `user:anne`
  "viewer", // has an `viewer` relation
  "document:new-roadmap", // with the object `document:new-roadmap`
   authorization_id="1uHxCSuTP0VKPYSnkq1pbb1jeZw"
);

Reply: true
```

### Contextual Tuples

- tuples that can be added to a check request
- only exist within the context of that particular request.
- not written to the store
  - 권한을 확인할 때 사용하는 튜플
  - 저장소에 작성은 되지 않는다.

### Type Bound Public Access

- `<type>:*`: evry object of that type of a *user* within a *relationship tuple*
  - cannot use `<type>:*`in the relation or object properties, `<type>:*` as part of a userset
  - 관계 튜플의 사용자에서 모든 개체를 나타낼 때 사용된다.

```json
[
  {
    "user": "user:*",
    "relation": "editor",
    "object": "document:new-roadmap",
  },
]
```
