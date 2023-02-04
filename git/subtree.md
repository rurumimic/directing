# git subtree

## how to add a subtree

### add a remote

```bash
git remote add hr https://github.com/rurumimic/human-resource.git
```

<details>
  <summary>git remote</summary>

```bash
git remote

hr
origin
```

```bash
cat .git/config

[remote "origin"]
 url = https://github.com/rurumimic/directing.git
 fetch = +refs/heads/*:refs/remotes/origin/*
[remote "hr"]
 url = https://github.com/rurumimic/human-resource.git
 fetch = +refs/heads/*:refs/remotes/hr/*
```

</details>

### add a subtree

```bash
git subtree add --prefix=hr hr master
```

<details>
  <summary>stdout</summary>

output:

```bash
git fetch hr master
From https://github.com/rurumimic/human-resource
 * branch            master     -> FETCH_HEAD
 * [new branch]   master     -> hr/master
Added dir 'hr'
```

tree:

```bash
directing.git/
├── LICENSE
├── README.md
├── git/
│   ├── README.md
│   └── subtree.md
└── hr/
    └── LICENSE
```

git log graph:

```bash
*   523798e - (2분 전) Add 'hr/' from commit '0273fc692996c073f717fbdc5d05134e7ced8193' (HEAD -> master)
|\  
| * 0273fc6 - Initial commit (hr/master)
* 2e5e029 - add remote: hr
* d2ffc37 - Initial commit (origin/master, origin/HEAD)
```

git log:

```bash
commit 523798e40706f2ae664a51a0dc6bd2309c881b41 (HEAD -> master)
Merge: 2e5e029 0273fc6
Date:   Sat Feb 4 15:21:46 2023 +0900

    Add 'hr/' from commit '0273fc692996c073f717fbdc5d05134e7ced8193'
    
    git-subtree-dir: hr
    git-subtree-mainline: 2e5e0290801ef54efe79a3198e4819f9c1e86edf
    git-subtree-split: 0273fc692996c073f717fbdc5d05134e7ced8193
```

</details>

<details>
  <summary>stderr: <i>Working tree has modifications.  Cannot add</i></summary>

```bash
git commit -am "add a new subtree"
```

</details>

## how to update repos

in project root directory:

### push a subtree directory

```bash
git subtree push --prefix=hr hr master
```

### pull a subtree directory

```bash
git subtree pull --prefix=hr hr master
```

---

## references

- [Git subtree: the alternative to Git submodule](https://www.atlassian.com/git/tutorials/git-subtree)
- [Git subtree를 활용한 코드 공유](https://blog.rhostem.com/posts/2020-01-03-code-sharing-with-git-subtree)
