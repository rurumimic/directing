# git subtree

## how to use subtree

### add remote

```bash
git remote add hr https://github.com/rurumimic/human-resource.git
```

```bash
cat .git/config
git remote
```

### add subtree

```bash
git subtree add --prefix=hr hr master
```

---

## references

- [Git subtree: the alternative to Git submodule](https://www.atlassian.com/git/tutorials/git-subtree)
- [Git subtree를 활용한 코드 공유](https://blog.rhostem.com/posts/2020-01-03-code-sharing-with-git-subtree)
