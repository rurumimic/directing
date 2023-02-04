# Human Resource

- 🫡 [directing](https://github.com/rurumimic/directing) 지휘
  - 👷 **human resource** 인적 자원 관리

---

- [Authentication vs. Authorization](auth/README.md)
- [RBAC vs ABAC](access-control/rbac-vs-abac.md)

---

## Note

## Auth

### AuthN vs AuthZ

- AuthN, 인증: verifies credentials
- AuthZ, 인가: grants or denies permissions

## Access Control, 접근 제어

- [RBAC vs ABAC](access-control/rbac-vs-abac.md): summary of the [article](https://www.okta.com/identity-101/role-based-access-control-vs-attribute-based-access-control/)

### RBAC: Role-based access control

- **Administrator**: identify roles, grant permissions, and otherwise maintain security systems
- **Role**: a group of workers based on the tasks
  - Authority, 권한
  - Responsibility, 책임
  - Competence, 자격/능력
- **Permission**
  - Access, 접근
  - Operations, 운영: read, write, share, finance
  - Sessions, 세션: login, expire
- **Security Levels**
  1. **Flat**: have *at least one role*
  2. **Hierarchical**: Flat + *role hierarchy*
  3. **Constrained**: Hierarchical + *separation of duties*
  4. **Symmetrical**: Constrained + *permission reviews*
- Pros
  - Reduce complexity, 관리가 간편함
  - Allow global administration, 여러 사용자의 권한을 한 번에 변경할 수 있음
  - Ease onboarding, 조직 관리가 쉬워짐
  - Reduce blunders, 실수가 줄어듦
  - Lower overall costs, 관리 비용을 낮춤

### ABAC: Attribute-based access control

- **Permission**
  - User
  - Resource attributes
  - Environment
- Coordinate attributes
  - **Subjects**: *Who* is trying to do the work?
  - **Objects**: *What file* within the network is the *user* trying to work with?
  - **Operation**: What is the *person* trying to *do* with said *file*?

#### if/then

- **If** the user is **in accounting**, **then** the person may **access** accounting files.
- **If** the person is **a manager**, **then** that person may **read/write** files.
- **If** the company policy specifies “no Saturday work” and today is **Saturday**, **then** **no one may access** any files today.

### ReBAC: Relationship-based access control

**ReBAC** allows expressing rules based on **relations** that **users** have **with objects** and that objects have **with other objects**.

For example, a user can view a document if they can view its parent folder.

#### Fine-Grained Authorization

**Fine-Grained Authorization** is being able to grant individual users access to specific objects or resources in a system.

A good example of this is **Google Drive**, where access can be granted either to documents, or folders; it can be granted to users individually or as a group. Access regularly changes as new documents are created and shared with specific users, whether inside the same company or outside.

---

## References

- RBAC
  - [What Is Role-Based Access Control (RBAC)?](https://www.okta.com/identity-101/what-is-role-based-access-control-rbac/)
  - [Role-Based Access Control (RBAC): Permissions vs. Roles](https://adriennedomingus.medium.com/role-based-access-control-rbac-permissions-vs-roles-55f1f0051468)
  - [ROLE BASED ACCESS CONTROL (RBAC)](https://csrc.nist.gov/CSRC/media/Presentations/Role-Based-Access-Control-(RBAC)-Presentation/images-media/rbac-slides-doe.pdf)
- ReBAC
  - [Introduction to Authorization and OpenFGA](https://openfga.dev/docs/authorization-and-openfga)
