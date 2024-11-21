# git patch

## git add --patch

### Examples

#### 1. current status

```bash
git status
```

```bash
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md
        modified:   main.c

no changes added to commit (use "git add" and/or "git commit -a")
```

#### 2. add --patch

```bash
git add --patch
```

```bash
diff --git a/README.md b/README.md
index 4d3f5e5..1ec053c 100644
--- a/README.md
+++ b/README.md
@@ -3,6 +3,7 @@
 - Braque
 - Gris
 - Leger
+- Gleizes
 - Delaunay
 - Picasso
```

#### 3. Help Git Add

```bash
(1/1) Stage this hunk [y,n,q,a,d,e,p,?]? ?

y - stage this hunk
n - do not stage this hunk
q - quit; do not stage this hunk or any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk or any of the later hunks in the file
e - manually edit the current hunk
p - print the current hunk, 'P' to use the pager
? - print help
```

#### 4. Stage README.md

```bash
(1/1) Stage this hunk [y,n,q,a,d,e,p,?]? y
```

#### 5. Edit main.c

```bash
diff --git a/main.c b/main.c
index e9c09fb..83ae6bf 100644
--- a/main.c
+++ b/main.c
@@ -1,6 +1,6 @@
 #include <stdio.h>

-int main(void) {
+int main(int argc, char *argv[]) {
     return 0;
 }

(1/1) Stage this hunk [y,n,q,a,d,e,p,?]? e
```

##### 5.1. Change code

```c
# Manual hunk edit mode -- see bottom for a quick guide.
@@ -1,6 +1,6 @@
 #include <stdio.h>
 
-int main(void) {
+int main(int argc, char *argv[]) {
     return 0;
 }
 
# ---
# To remove '-' lines, make them ' ' lines (context).
# To remove '+' lines, delete them.
# Lines starting with # will be removed.
# If the patch applies cleanly, the edited hunk will immediately be marked for staging.
# If it does not apply cleanly, you will be given an opportunity to
# edit again.  If all lines of the hunk are removed, then the edit is
# aborted and the hunk is left unchanged.
```

#### 6. diff --staged

```bash
git diff --staged
```

```bash
diff --git a/README.md b/README.md
index 4d3f5e5..1ec053c 100644
--- a/README.md
+++ b/README.md
@@ -3,6 +3,7 @@
 - Braque
 - Gris
 - Leger
+- Gleizes
 - Delaunay
 - Picasso

diff --git a/main.c b/main.c
index e9c09fb..943bd6c 100644
--- a/main.c
+++ b/main.c
@@ -1,6 +1,6 @@
 #include <stdio.h>

-int main(void) {
+int main(int argc, char **argv) {
     return 0;
 }
```

#### 7. status

```bash
git status
```

```bash
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   README.md
        modified:   main.c

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   main.c
```

#### 8. commit

```bash
git commit -m "edit..."
```

#### 9. status

```bash
On branch master
nothing to commit, working tree clean
```

