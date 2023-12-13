# Group-6


## Contribution Guideline

### Creating new working branch
```
git checkout main
```
For any new feature create new feature branch

```
git checkout -b feature-branch
```
### Merging the working branch
```
git checkout main
git merge feature-branch
```

### Removing the merged branch
```
git branch -d feature-branch
git push --delete origin feature-branch
```