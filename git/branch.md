# git branch

- [Learn Git Branching](https://learngitbranching.js.org/?locale=en_US), [Git 브랜치 배우기](https://learngitbranching.js.org/?locale=ko)
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

## Ramping Up

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

---

## Moving Around

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

### Interactive Rebase

```bash
* c5 (HEAD -> master)
* c4
* c3
* c2
* c1 # HEAD~4
* c0
```

```bash
git rebase -i HEAD~4
```

interactive reabase:

```bash
pick c2
s    c5 # squash
f    c3 # fixup
r    c4 # reword
```

first: pick + squash + fixup

```bash
# This is a combination of 3 commits.
# This is the 1st commit message:

c2

# This is the commit message #2:

c5

# The commit message #3 will be skipped:

# c3
```

first commit message:

```bash
c2 + c5 (+ c3)
```

second commit message:

```bash
c4 -> new c4
```

success:

```bash
git rebase -i HEAD~4

[detached HEAD 5625f2a] c2 + c5 (+ c3)
 Date: Sun Jul 23 21:56:22 2023 +0900
 3 files changed, 3 insertions(+)
 create mode 100644 c2
 create mode 100644 c3
 create mode 100644 c5
[detached HEAD bef5a09] c4 -> new c4
 Date: Sun Jul 23 21:56:55 2023 +0900
 1 file changed, 1 insertion(+)
 create mode 100644 c4
Successfully rebased and updated refs/heads/master.
```

logs:

```bash
* c4 -> new c4 (HEAD -> master)
* c2 + c5 (+ c3)
* c1
* c0
```

---

## Mixed Bag

### Grabbing just 1 commit

```bash
* c4 (HEAD -> bugFix)
* c3 (printf)
* c2 (debug)
* c1 (master)
* c0
```

```bash
git rebase -i master

d    c2 # drop
d    c3 # drop
pick c4

Successfully rebased and updated refs/heads/bugFix.
```

```bash
* c4 (HEAD -> bugFix)
| * c3 (printf)
| * c2 (debug)
|/
* c1 (master)
* c0
```

```bash
# git rebase <basebranch> <topicbranch>
git rebase bugFix master

Successfully rebased and updated refs/heads/master.
```

```bash
* c4 (HEAD -> master, bugFix)
| * c3 (printf)
| * c2 (debug)
|/
* c1
* c0
```

### Juggling commits

```bash
* c3 (HEAD -> caption)
* c2 (newImage)
* c1 (master)
* c0
```

```bash
git rebase -i master

# pick c3
# pick c2

* c2 (HEAD -> caption)
* c3
| * c2 (newImage)
|/
* c1 (master)
* c0
```

```bash
git commit --amend

* c2 -> new c2 (HEAD -> caption)
* c3
| * c2 (newImage)
|/
* c1 (master)
* c0
```

```bash
git rebase -i master

# pick c2 -> new c2
# pick c3

* c3 (HEAD -> caption)
* c2 -> new c2
| * c2 (newImage)
|/
* c1 (master)
* c0
```

```bash
git rebase caption master # = git checkout master && git rebase caption
```

```bash
* c3 (HEAD -> master, caption)
* c2 -> new c2
| * c2 (newImage)
|/
* c1
* c0
```

### Juggling commits 2

```bash
* a980231 c3 (HEAD -> caption)
* 245ea0b c2 (newImage)
* c1 (master)
* c0
```

```bash
git checkout main
git cherry-pick 245ea0b
git commit --amend -m "c2 -> new c2"
git cherry-pick a980231
```

```bash
* c3 (HEAD -> master)
* c2 -> new c2
| * c3 (caption)
| * c2 (newImage)
|/
* c1
* c0
```

### Git Tags

```bash
git tag v1 [HEAD]
git tag v1 <ref>

git checkout v1
```

### Git Describe

```bash
git describe <ref>
git describe <ref> --tags

<tag>_<numCommits>_g<hash>
```

```bash
git describe master --tags

v1-2-g414d42d
```

---

## Advanced

### Multiple Parents

```bash
* c7 (HEAD -> master)
* c6
|\
| * c5
| * c4
| * c3
* | c2
* | c1
|/
* c0
```

```bash
git checkout HEAD~^2~2

# git checkout HEAD~
# git checkout HEAD^2
# git checkout HEAD~2
```

```bash
* c7 (master)
* c6
|\
| * c5
| * c4
| * c3 (HEAD)
* | c2
* | c1
|/
* c0
```

```bash
git branch bugWork master^^2^
```

```bash
* c7 (master)
* c6
|\
| * c5
| * c4 (bugFix)
| * c3 (HEAD)
* | c2
* | c1
|/
* c0
```

---

## Remote

### Create a bare repository

make some commits:

```bash
mkdir repo && cd repo && git init
echo c0 > c0 && git add c0 && git commit -m c0
echo c1 > c1 && git add c1 && git commit -m c1
```

clone a bare repo:

```bash
cd ..
git clone --bare repo repo.git
```

remove non-repo:

```bash
rm -rf repo
```

### Clone

```bash
git clone repo.git repo
cd repo
```

```bash
git log

* c1 (HEAD -> master, origin/master, origin/HEAD)
* c0
```

```bash
git remote -v

origin ./repo.git (fetch)
origin ./repo.git (push)
```

```bash
git branch -a

* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```

### Remote Branches

```bash
echo c2 > c2 && git add c2 && git commit -m c2
git checkout origin/master
echo c3 > c3 && git add c3 && git commit -m c3
```

```bash
git branch -a

* (detached HEAD)
  master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```

git log of `repo`:

```bash
* c3 (HEAD)
| * c2 (master)
|/  
* c1 (origin/master, origin/HEAD)
* c0 
```

git log of `repo.git`:

```bash
* c1 (HEAD -> master)
* c0 
```

### Git Fetch

1. Downloads the commits that the remote has but are missing from the local repository
2. Updates where remote branches point (for instance, origin/master)
3. Does not change anything about the local state
4. It will not update master branch or change anything about how the file system looks right now

git log of `repo.git`: 

```bash
* c3 (bugFix)
| * c2 (HEAD -> master)
|/  
* c1
* c0
```

git fetch in `repo`:

```bash
git fetch

* c3 (origin/bugFix)
| * c2 (origin/master, origin/HEAD)
|/  
* c1 (HEAD -> master)
* c0
```

### Git Pull

Update code to fetch data:

```bash
git cherry-pick origin/master
git rebase origin/master
git merge origin/master # == git fetch; git merge origin/master
```

```bash
* c3 (origin/bugFix)
| * c2 (HEAD -> master, origin/master, origin/HEAD)
|/  
* c1
* c0
```

### Git Push

```bash
git push
```

### Diverged History

`repo.git`:

```bash
* c3 (HEAD -> master)
* c2
* c1
* c0
```

`repo`:

```bash
* c4 (HEAD -> master)
* c2 (origin/master, origin/HEAD)
* c1 
* c0 
```

try push:

```bash
git push

 ! [rejected]        master -> master (fetch first)
```

#### Rebase

```bash
git fetch
git rebase origin/master
git push
```

```bash
* c4 (HEAD -> master, origin/master, origin/HEAD)
* c3
* c2
* c1
* c0
```

#### Merge

```bash
git fetch
git merge origin/master
git push
```

```bash
* Merge remote-tracking branch 'origin/master' (HEAD -> master, origin/master, origin/HEAD)
|\  
| * c3 
* | c4 
|/  
* c2 
* c1 
* c0 
```

#### Git Pull Rebase

```bash
git pull --rebase # git fetch && git rebase origin/master
git push
```

### Locked Master

```bash
* C2 (HEAD, master)
* C1 (origin/master)
* C0
```

try push to locked master:

```bash
! [remote rejected] master -> master (TF402455: Pushes to this branch are not permitted; you must use a pull request to update this branch.)
```

```bash
git reset --hard origin/master
git checkout -b feature C2
git push origin feature
```

```bash
* C2 (HEAD, feature, origin/feature)
* C1 (master, origin/master)
* C0
```

