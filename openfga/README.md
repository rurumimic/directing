# OpenFGA

- [OpenFGA](https://openfga.dev/)
  - [docs](https://openfga.dev/docs/)
- [github](https://github.com/openfga)
- doc
  - [Getting Started](https://openfga.dev/docs/getting-started)

---

## Summary

### Authorization Check

- "Can user **U** *perform an action* **A** on object **O**?"
- "Can user **Jane** *perform action* **view** on object **project sandcastle**?"

#### But Why?

- Why could user **U** *perform an action* **A** on an object **O**?

### Defining Authorization Models

![start_process](https://openfga.dev/assets/images/getting-started-diagram-01-55e7a873e7fdd4aa810922af9606ad0c.svg)

1. Pick the most important feature: 가장 중요한 기능을 고르세요.
   - "역할"이라는 단어는 잊어버립니다.
   - 기능에 대한 설명을 작성: "만약에 ...일 때, 사용자는 어떠한 것에 대해 특정 행동을 할 수 있다."
2. List the object types: 개체를 나열하세요.
3. List relations for those types: 종류에 대한 관계를 나열하세요.
4. Define relations: 관계를 정의하세요.
5. Test the model: 모델을 검증하세요.
6. Iterate: 반복합니다.

#### 예시

1. 기능 설명
   1. A user can create a document in a drive if they are the owner of the drive.
   2. A user can create a folder in a drive if they are the owner of the drive.
   3. A user can be a member of an organization.
2. 개체
   1. A user can create a **DOCUMENT** in a drive if they are the *owner of the drive*.
   2. A user can create a **FOLDER** in a drive if they are the *owner of the drive*.
   3. A user can be a member of an **ORGANIZATION**.
3. 개체들의 관계
   1. A user **can create a document in a drive** if they are the *owner of the drive*.
   2. A user **can create a folder in a drive** if they are the *owner of the drive*.
   3. A user **can be a member of an organization**.

관계 정의:

```dsl
model
  schema 1.1
type user
type organization
  relations
    define member: [user,organization#member]
type document
  relations
    define owner: [user,organization#member]
    define editor: [user,organization#member]
    define viewer: [user,organization#member]
    define parent: [folder]
    define can_share: owner or editor or owner from parent
    define can_view: viewer or editor or owner or viewer from parent or editor from parent or owner from parent
    define can_write: editor or owner or owner from parent
    define can_change_owner: owner
```

관계 튜플 작성:

```json
{ user:"user:anne", relation: "member", object: "organization:contoso"}
{ user:"user:beth", relation: "member", object: "organization:fabrikam"}
{ user:"user:anne", relation: "owner", object: "document:1"}
{ user:"organization:fabrikam#member", relation: "editor", object: "document:1"}
{ user:"user:beth", relation: "owner", object: "document:2"}
{ user:"organization:contoso#member", relation: "viewer", object: "document:2"}
```

---

## Content

- [Concept](concept.md)
- Start
  - [OpenFGA Server](server/README.md)
  - SDK Client
    - [node](client/node/README.md)
    - [go](client/go/README.md)
  - [Node with Framework](client/with-framework/README.md)
