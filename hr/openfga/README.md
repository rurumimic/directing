# OpenFGA

- [OpenFGA](https://openfga.dev/)
  - [docs](https://openfga.dev/docs/)
- [github](https://github.com/openfga)
- doc
  - [Getting Started](https://openfga.dev/docs/getting-started)

---

## Summary

### Authorization Check, 권한 확인

- "Can user **U** *perform an action* **A** on object **O**?"
- "Can user **Jane** *perform action* **view** on object **project sandcastle**?"
- "사용자 **Jane**이 개체 **프로젝트 샌드캐슬**에서 **열람** *작업을 수행*할 수 있나요?"

#### Why, 권한을 허가받은 이유는?

- Why could user **U** *perform an action* **A** on an object **O**?
- 사용자 **U**가 개체 **O**에 대해 **A** *작업을 수행*할 수 있는 이유는 무엇인가요?

### Defining Authorization Models, 권한부여 모델 정의 순서

![start_process](https://openfga.dev/assets/images/getting-started-diagram-01-55e7a873e7fdd4aa810922af9606ad0c.svg)

1. Pick the most important feature: 가장 중요한 기능을 고른다.
   - "역할"이라는 단어는 잊어버리자.
   - 기능에 대한 설명을 작성: "만약에 ...일 때, 사용자는 어떠한 것에 대해 특정 행동을 할 수 있다."
2. List the object types: 개체를 나열한다.
3. List relations for those types: 종류에 대한 관계를 나열한다.
4. Define relations: 관계를 정의한다.
5. Test the model: 모델을 검증한다.
6. Iterate: 반복한다.

---

## Content

- [Concept](concept.md)
- Start
  - [OpenFGA Server](server/README.md)
  - SDK Client
    - [node](client/node/README.md)
    - [go](client/go/README.md)
  - [Node with Framework](client/with-framework/README.md)
- Modeling Guides
  - [Direct Access](modeling-guides/direct-access/README.md)
  - [User Groups](modeling-guides/user-groups/README.md)
  - [Roles and Permissions](modeling-guides/roles-permissions/README.md)
  - [Parent-Child](modeling-guides/parent-child/README.md)
  - [Blocklists](modeling-guides/blocklists/README.md)
  - [Public Access](modeling-guides/public-access/README.md)
  - [Multiple Restrictions](modeling-guides/multiple-restrictions/README.md)
  - [Custom Roles](modeling-guides/custom-roles/README.md)
  - [Contextual and Time-Based Authorization](modeling-guides/contextual-time-based-authorization/README.md)
- Use Cases
  - [Google Drive](usecases/google-drive/README.md)
  - [GitHub](usecases/github/README.md)
  - [Slack](usecases/slack/README.md)
  - [IoT](usecases/iot/README.md)
  - [Entitlements](usecases/entitlements/README.md)
