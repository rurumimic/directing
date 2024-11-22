# git patch

## git add --patch

### Examples

#### 1. Create two files

`README.md`:

````md
# Hello, World!

```bash
$ gcc -o main main.c
$ ./main
Hello, World!
```
````

`main.c`:

```c
#include <stdio.h>

void main(void) {
    printf("Hello, World!\n");
    return;
}
```

#### 2. init

Initial commit:

```bash
git init
git add .
git commit -m "Hello, World!"
```

#### 3. Edit files

`README.md`:

````md
# Hello, World!

```bash
$ gcc -o main main.c
$ ./main
Hello, World!

$ ./main Alice
Hello, Alice!
```
````

`main.c`:

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
    if (argc > 1) {
        printf("Hello, %s!\n", argv[1]);
        return 0;
    }

    printf("Hello, World!\n");
    return 0;
}
```

#### 3.1. status

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

#### 4. add --patch

```bash
git add --patch
```

````bash
diff --git a/README.md b/README.md
index 21ec9b5..6bab822 100644
--- a/README.md
+++ b/README.md
@@ -4,5 +4,8 @@
 $ gcc -o main main.c
 $ ./main
 Hello, World!
+
+$ ./main Alice
+Hello, Alice!
 ```
````

##### 4.1. Help Git Add

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

##### 4.2. Skip README.md

```bash
(1/1) Stage this hunk [y,n,q,a,d,e,p,?]? n
```

##### 4.3. Edit main.c

```bash
diff --git a/main.c b/main.c
index e236066..bb23316 100644
--- a/main.c
+++ b/main.c
@@ -1,7 +1,12 @@
 #include <stdio.h>

-void main(void) {
+int main(int argc, char *argv[]) {
+    if (argc > 1) {
+        printf("Hello, %s!\n", argv[1]);
+       return 0;
+    }
+
     printf("Hello, World!\n");
-    return;
+    return 0;
 }

(1/1) Stage this hunk [y,n,q,a,d,e,p,?]? e
```

##### 4.4. Change a signature

Only change the main function's signature: 

```c
# Manual hunk edit mode -- see bottom for a quick guide.
@@ -1,7 +1,12 @@
 #include <stdio.h>
 
-void main(void) {
+int main(int argc, char *argv[]) {
     printf("Hello, World!\n");
-    return;
+    return 0;
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

##### 4.5. Commit for changing the main function signature

Check changes:

```bash
git status
```

```bash
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   main.c

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md
        modified:   main.c
```

Commit:

```bash
git commit -m "Change function signature"
```

```bash
[master 3c9bf9b] Change function signature
 1 file changed, 2 insertions(+), 2 deletions(-)
```

#### 5. add --patch

```bash
git add --patch
```

Stage `README.md`:

````bash
diff --git a/README.md b/README.md
index 21ec9b5..6bab822 100644
--- a/README.md
+++ b/README.md
@@ -4,5 +4,8 @@
 $ gcc -o main main.c
 $ ./main
 Hello, World!
+
+$ ./main Alice
+Hello, Alice!
 ```

(1/1) Stage this hunk [y,n,q,a,d,e,p,?]? y
````

Stage `main.c`:

```bash
diff --git a/main.c b/main.c
index 995e78f..bb23316 100644
--- a/main.c
+++ b/main.c
@@ -1,6 +1,11 @@
 #include <stdio.h>

 int main(int argc, char *argv[]) {
+    if (argc > 1) {
+        printf("Hello, %s!\n", argv[1]);
+       return 0;
+    }
+
     printf("Hello, World!\n");
     return 0;
 }

(1/1) Stage this hunk [y,n,q,a,d,e,p,?]? y
```

##### 5.1. diff --staged

```bash
git diff --staged
```

````bash
diff --git a/README.md b/README.md
index 21ec9b5..6bab822 100644
--- a/README.md
+++ b/README.md
@@ -4,5 +4,8 @@
 $ gcc -o main main.c
 $ ./main
 Hello, World!
+
+$ ./main Alice
+Hello, Alice!
 ```

diff --git a/main.c b/main.c
index 995e78f..bb23316 100644
--- a/main.c
+++ b/main.c
@@ -1,6 +1,11 @@
 #include <stdio.h>

 int main(int argc, char *argv[]) {
+    if (argc > 1) {
+        printf("Hello, %s!\n", argv[1]);
+       return 0;
+    }
+
     printf("Hello, World!\n");
     return 0;
 }
````

##### 5.2. status

```bash
git status
```

```bash
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   README.md
        modified:   main.c

```

#### 6. commit

```bash
git commit -m "Hello, Alice!"
```

```bash
[master 5ebd84e] Hello, Alice!
 2 files changed, 8 insertions(+)
```

#### 7. status

```bash
On branch master
nothing to commit, working tree clean
```

#### 8. log

```bash
* 5ebd84e - (3 seconds ago)  Hello, Alice!             (HEAD -> master)
* 3c9bf9b - (5 minutes ago)  Change function signature
* e82e5ca - (13 minutes ago) Hello, World!
```

