# git branch

- [Learn Git Branching](https://learngitbranching.js.org/)
- [Oh-My-Zsh Git](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)

## Init

```bash
git config --global init.defaultBranch master
```

```bash
git init

# rename branch
git branch -m <new_name> # gb -m <new_name>
```

### Init GitHub

```bash
git init # g init
git add . # ga .
git commit -m "first commit" #gcmsg "first commit"
git branch -M master # gb -M master
git remote add origin https://github.com/<user>/<repo>.git # gra origin ...
git push -u origin master # gp -u origin master
```

### Checkout

```bash
* c1 (HEAD -> master)
* c0
```

```bash
# gcb newImage
git branch newImage # gb newImage
git checkout newImage
git commit
```

```bash
* c2 (HEAD -> newImage)
* c1 (master)
* c0
```

### Merge

```bash
* c3 (HEAD -> master)
| *c2 (newImage)
|/
* c1
* c0
```

```bash
git checkout newImage # gcm
git merge master # gm newImage
```

```bash
* Merge branch 'master' into newImage (HEAD -> newImage)
|\
| * c3 (master)
* | c2
|/
* c1
* c0
```

#### Merge Conflict

```bash
:DiffviewOpen
:DiffviewClose
```

```bash
# select
2do
3do
```

#### Reset Merge

```bash
git reflog
git reset --merge HEAD~1
```

```bash
* c3 (master)
| * c2 (HEAD -> newImage)
|/
* c1
* c0
```

### Rebase

```bash
* c3 (master)
| * c2 (HEAD -> newImage)
|/
* c1
* c0
```

```bash
git rebase master

Successfully rebased and updated refs/heads/newImage.
```

```bash
* c2 (HEAD -> newImage)
* c3 (master)
* c1
* c0
```

```bash
git checkout master
git rebase newImage

Successfully rebased and updated refs/heads/master.
```

```bash
* c2 (HEAD -> master, newImage)
* c3
* c1
* c0
```

---

## Next Step

### HEAD

```bash
* b3e0450 c3 (HEAD -> newImage)
| * c2 (master)
|/
* c1
* c0
```

```bash
git checkout b3e0450
```

```bash
* b3e0450 c3 (HEAD, newImage)
| * c2 (master)
|/
* c1
* c0
```

### Relative Ref

- `^` Caret: moving upwards one commit
- `~<num>` Tilde: moving upwards a number of times

```bash
* c4 (newImage)
* c3
| * c2 (HEAD -> master)
|/
* c1
* c0
```

```bash
git checkout newImage^
```

```bash
* c4 (newImage)
* c3 (HEAD)
| * c2 (master)
|/
* c1
* c0
```

```bash
git checkout HEAD~2
```

```bash
* c4 (newImage)
* c3
| * c2 (master)
|/
* c1
* c0 (HEAD)
```

### Branch Forcing

```bash
*  c4 (HEAD -> newImage)
* c3
| * c2 (master)
|/
* c1
* c0
```

```bash
git branch -f main HEAD~3
```

```bash
* ac54fcd c4 (HEAD -> newImage)
* c3
* c1
* c0 (master)
```

```bash
git checkout HEAD^^

* ac54fcd c4 (newImage)
* c3
* c1 (HEAD)
* c0 (master)
```

```bash
git branch -f newImage Head~1

* c1 (HEAD)
* c0 (newImage, master)
```

```bash
git branch -f master ac54fcd

* ac54fcd c4 (master)
* c3
* c1 (HEAD)
* c0 (newImage)
```

### Reversing Changes

- git reset: rewriting history for local branches
- git revert: reverse changes and share changes with others

```bash
* c2 (HEAD -> master)
* c1
* c0
```

```bash
git reset HEAD~1
```

```bash
* c1 (HEAD -> master)
* c0
```

```bash
git revert HEAD

# Revert "c1"
#
# This reverts commit 716b4e
```

```bash
* Revert "c1" (HEAD -> master)
* c1
* c0
```

