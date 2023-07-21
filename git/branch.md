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
* b3e0450 - c3 (HEAD -> newImage)
| * c2 (master)
|/
* c1
* c0
```

```bash
git checkout b3e0450
```

```bash
* b3e0450 - c3 (HEAD, newImage)
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
* ac54fcd - c4 (HEAD -> newImage)
* c3
* c1
* c0 (master)
```

```bash
git checkout HEAD^^

* ac54fcd - c4 (newImage)
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

* ac54fcd - c4 (master)
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

### Cherry-pick

```bash
* 4c41337 - c7 (another)
* c6
| * c5 (side)
| * 2a7f7fb - c4
|/
| * 2feccdf - c3 (bugFix)
| * c2
|/
* c1 (HEAD -> master)
* c0
```

```bash
git cherry-pick 2feccdf 2a7f7fb 4c41337
```

#### Cherry-pick Conflict

```bash
After resolving the conflicts, mark them with
"git add/rm <pathspec>", then run
"git cherry-pick --continue".
You can instead skip this commit with "git cherry-pick --skip".
To abort and get back to the state before "git cherry-pick",
run "git cherry-pick --abort".
```

conflict 1: c2 vs c3

```bash
vi main.c
```

```c
#include<stdio.h>

int main(void) {
  printf("C0\n");
  printf("C1\n");
<<<<<<< HEAD
||||||| parent of 2feccdf (c3)
  printf("C2\n");
=======
  printf("C2\n");
  printf("C3\n");
>>>>>>> 2feccdf (c3)
  return 0;
}
```

pick c3:

```c
#include<stdio.h>

int main(void) {
  printf("C0\n");
  printf("C1\n");
  printf("C2\n");
  printf("C3\n");
  return 0;
}
```

```bash
git add main.c
git cherry-pick --continue
```

c4: auto picked

```bash
* 9196e33 - c4 (HEAD -> master)
* 9f955f2 - c3
| * 4c41337 - c7 (another)
| * c6
|/
| * c5 (side)
| * 2a7f7fb - c4
|/
| * 2feccdf - c3 (bugFix)
| * c2
|/
* c1
* c0
```

conflict: c6 vs c7

```bash
vi main.c
```

```c
#include<stdio.h>

<<<<<<< HEAD
||||||| parent of 4c41337 (c7)
void another() {
  printf("C6\n");
}

=======
void another() {
  printf("C6\n");
  printf("C7\n");
}

>>>>>>> 4c41337 (c7)
int main(void) {
  printf("C0\n");
  printf("C1\n");
  printf("C2\n");
  printf("C3\n");
  return 0;
}

void side() {
  printf("C4\n");
}
```

pick c7:

```c
#include<stdio.h>

void another() {
  printf("C6\n");
  printf("C7\n");
}

int main(void) {
  printf("C0\n");
  printf("C1\n");
  printf("C2\n");
  printf("C3\n");
  return 0;
}

void side() {
  printf("C4\n");
}
```

```bash
git add main.c
git cherry-pick --continue
```

```bash
* 9827eec - c7 (HEAD -> master)
* 9196e33 - c4
* 9f955f2 - c3
| * 4c41337 - c7 (another)
| * c6
|/
| *c5 (side)
| * 2a7f7fb - c4
|/
| * 2feccdf - c3 (bugFix)
| * c2
|/
* c1
* c0
```

