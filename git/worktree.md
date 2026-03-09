# 🌵 git worktree

Two common patterns:

1. regular clone + sibling worktree
2. bare clone + sibling worktree

```bash
<repo>/                 # develop branch
<repo>.worktrees/foo/   # foo branch
<repo>.worktrees/bar/   # bar branch
```

## Clone the repository and check out `develop`

```bash
gh repo clone <owner>/<repo>
cd <repo>
git fetch origin

git switch develop
git pull --ff-only origin develop
```

## Create a worktree for a new branch

```bash
mkdir -p ../<repo>.worktrees
```

```bash
git worktree add ../<repo>.worktrees/foo -b foo develop
git worktree add ../<repo>.worktrees/bar -b bar develop
```

Check the upstream/tracking configuration:

```bash
git branch -vv
```

## Create branches first, then attach worktrees

```bash
git branch foo develop
git branch bar develop
```

```bash
git worktree add ../<repo>.worktrees/foo foo
git worktree add ../<repo>.worktrees/bar bar
```

Work in each directory as needed.

## Working with multiple worktrees in VS Code

Manage multiple worktrees simultaneously using the workspace feature in VS Code.

### Multiple worktrees in the Source Control tab

In a multi-root workspace, other worktrees are also visible in the Source Control tab.

### Add multiple worktrees to the workspace

1. Open VS Code.
2. Go to the File menu.
3. Select "Add Folder to Workspace..." and choose `<repo>.worktrees`.

### Save the workspace

1. Open VS Code.
2. Go to the File menu.
3. Select "Save Workspace As..." and save it as `<repo>.code-workspace`.

### Open the workspace

```bash
code -n <repo>.code-workspace
```

## Delete a worktree

```bash
git worktree list

/<repo>/                      1a2b3c4 [develop]
/<repo>.worktrees/foo/        5d6e7f8 [foo]
/<repo>.worktrees/bar/        9a0b1c2 [bar]
```

Remove a worktree:

```bash
git worktree remove <path>
```

Delete a branch after the worktree has been removed:

```bash
git branch -d foo
```
