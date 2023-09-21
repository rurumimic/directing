# github

## SSH

- doc: [Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [private email](https://github.com/settings/emails)

### Create a new SSH key

```bash
ssh-keygen -t ed25519 -C "private@mail.com"
ssh-add ~/.ssh/id_ed25519
```

### Add a new SSH key

- github settings: [SSH and GPG Keys](https://github.com/settings/keys)

```bash
cat ~/.ssh/id_ed25519.pub
```

### HTTPS to SSH

```bash
git remote -v

origin	https://github.com/USER/REPO (fetch)
origin	https://github.com/USER/REPO (push)
```

```bash
git remote set-url origin git@github.com:USER/REPO.git
```

```bash
git remote -v

origin	git@github.com:USER/REPO.git (fetch)
origin	git@github.com:USER/REPO.git (push)
```

### Update remote refs

```bash
git push -u origin master
```

