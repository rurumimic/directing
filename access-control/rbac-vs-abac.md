# RBAC vs ABAC

summary:

- [RBAC vs. ABAC: Definitions & When to Use](https://www.okta.com/identity-101/role-based-access-control-vs-attribute-based-access-control/)
- [RBAC와 ABAC 의 특징 비교: 정의 및 사용 사례](https://www.okta.com/kr/identity-101/role-based-access-control-vs-attribute-based-access-control/)

## RBAC: Role-based access control

### Role, 역할

**a group of people** that share certain characteristics:

- Departments, 부서
- Locations, 위치
- Seniority levels, 연공서열
- Work duties, 담당업무

### Permission, 권한

- **Access**, 접근
  - What can the person **see**?
  - 무엇에 **접근**할 수 있는가?
- **Operations**, 운영
  - What can the person **read**? What can the person **write**? Can the person **create** or **delete** files?
  - 무엇을 **읽고**, 무엇을 **작성**할 수 있는가? 파일을 **생성** 또는 **삭제**할 수 있는가?
- **Sessions**, 세션
  - **How long** can the person **stay in** the system? When will the login work? When will the login expire?
  - 시스템에 **얼마나 오래 머무를 수 있는가**? 로그인은 언제 작동하고, 언제 만료되는가?

### 4 Subtypes and Security Levels, 4가지 하위 종류와 보안 수준

NIST's model: [Role Based Access Control](https://csrc.nist.gov/projects/role-based-access-control)

- **Level 1, Flat**, 균일
  - Employees use roles to **gain permissions**.
  - 직원들은 **역할에 따라 권한**을 얻습니다.
    - All employees have **at least one role** that defines permissions, but some have more than one.
    - 모든 직원이 권한을 정의하는 **역할을 한 가지 이상** 맡고 있지만, 두 가지 이상의 역할을 수행하는 직원도 있습니다.
- **Level 2, Hierarchical**, 계층
  - Flat RBAC + **role hierarchy**
  - 균일적 RBAC + **역할의 계층 구조**
    - Seniority levels define **how roles work together**. Senior executives have their own permissions, but they also have those attained by their underlings.
    - 연공서열은 **역할 간의 협업 방식**을 정의합니다. 고위 경영진은 자체 권한 뿐만 아니라, 부하 직원이 획득한 권한도 갖습니다.
- **Level 3, Constrained**, 제한
  - Hierarchical RBAC + **separation of duties**
  - 계층적 RBAC + **직무 분리**
    - Separation of duties is added, and several people **work on one task together**. This helps to ensure security and prevent fraudulent activities.
    - 업무의 분리가 추가되고 여러 사람이 **하나의 작업을 함께 수행합니다**. 이는 보안을 보장하고 사기 행위를 방지하는 데 도움이 됩니다.
- **Level 4, Symmetrical**, 대칭
  - Constrained RBAC + **permission reviews**
  - 제한적 RBAC + **권한 검토**
    - Role permissions are reviewed frequently, and permissions change as the result of that review.
    - 역할 권한이 수시로 검토되며, 이 결과에 따라 권한이 변경됩니다.

---

## ABAC: Attribute-based access control

### Permission, 권한

- **User**, 사용자
  - A person's job title, typical tasks, or seniority level could determine the work that can be done.
  - 사람의 직급과 일반적인 작업, 또는 연공서열에 따라 수행 가능한 작업이 결정될 수 있습니다.
- **Resource attributes**, 리소스 속성
  - The type of file, the person who made it, or the document's sensitivity could determine access.
  - 파일 유형, 만든 사람, 문서의 중요도에 따라 액세스 권한이 결정될 수 있습니다.
- **Environment**, 환경
  - Where the person is accessing the file, the time of day, or the calendar date could all determine access.
  - 파일에 액세스하고 있는 위치, 시간대 또는 날짜에 따라 액세스 권한이 결정될 수 있습니다.

### Coordinate attributes, 속성 조합

- **Subjects**, 주제
  - **Who** is trying to do the work?
  - 누가 업무를 수행하려고 하는가?
- **Objects**, 객체
  - **What file** within the network is the **user** trying to work with?
  - 사용자가 네트워크 내의 어떤 파일을 사용하려고 하는가?
- **Operation**, 운영
  - What is the **person** trying to **do** with said **file**?
  - 해당 파일로 무엇을 하려고 하는가?

#### if/then, ...라면 ...이다

- **If** the user is **in accounting**, **then** the person may **access** accounting files.
  - 회계 팀에 소속된 사용자라면 회계 파일에 액세스할 수 있습니다.
- **If** the person is **a manager**, **then** that person may **read/write** files.
  - 관리자라면 파일에 대한 읽기/쓰기를 수행할 수 있습니다.
- **If** the company policy specifies “no Saturday work” and today is **Saturday**, **then** **no one may access** any files today.
  - 회사 정책에 "토요일 휴무"로 지정되어 있는 경우, 토요일에는 누구도 파일에 액세스할 수 없습니다.

---

## RBAC vs ABAC: Pros & Cons

| | RBAC | ABAC |
|---|---|---|
| + | <ul><li>Simplicit, 단순성</li></ul> | <ul><li>Well-defined control, 높은 수준의 제어</li></ul> |
| - | <ul><li>Role explosions, 역할 폭발</li></ul> | <ul><li>Time constraints, 시간 제약</li><li>Expertise, 전문성</li></ul> |

- RBAC
  - Complex System = Hard Workload
  - 시스템이 복잡해질 수록 힘들다
- ABAC
  - Rule management is difficult
  - 규칙 관리가 힘들다

---

## 5 Identity Management Scenarios to Study

### Small workgroups

- RBAC
- define: by role
- efficient and easy to set up

### Geographically diverse workgroups

- ABAC
- define: by employee type, location, and business hours
  - allow access during business hours for the specific time zone of a branch

### Time-defined workgroups

- ABAC
- with time-based rules

### Simply structured workgroups

- RBAC
- define: by the jobs people do
- example
  - receptionists: read/write scheduling
  - doctor: see medical test results or billing information

### Creative enterprises

- ABAC
- define: by the document, not by the roles
- example
  - creative staff, artists and writers: create files
  - billing departments and account executives: might need to see those files
  - marketing team: might want to share them

---

## References

- NIST's model: [Role Based Access Control](https://csrc.nist.gov/projects/role-based-access-control)
- [Policy Engineering in RBAC and ABAC](https://link.springer.com/chapter/10.1007/978-3-030-04834-1_2)
- [Adding Attributes to Role-Based Access Control](https://www.researchgate.net/publication/260584013_Adding_Attributes_to_Role-Based_Access_Control)
- [Role-Based ABAC Model for Implementing Least Privileges](https://dl.acm.org/doi/abs/10.1145/3316615.3316667)
- okta: [Identity 101 Index](https://www.okta.com/identity-101/)
