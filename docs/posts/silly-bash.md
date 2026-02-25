# 我在控制台输入的一堆令人无语的命令

无话可说了。直接粘贴到下面了。

```bash
Microsoft Windows [版本 10.0.26200.7840]
(c) Microsoft Corporation。保留所有权利。

D:\simonprojects>cd .\websites\pm-site

D:\simonprojects\websites\pm-site>git add .

D:\simonprojects\websites\pm-site>git commit -m "修复英文标题错误"
[main 2103441] 淇鑻辨枃鏍囬閿欒
 1 file changed, 2 insertions(+), 2 deletions(-)

D:\simonprojects\websites\pm-site>git push
fatal: unable to access 'https://github.com/ShiMingXuanSimon/Site-PointsManagement.git/': SSL certificate problem: unable to get local issuer certificate

D:\simonprojects\websites\pm-site>git config -h
usage: git config [<options>]
Config file location
    --[no-]global         use global config file
    --[no-]system         use system config file
    --[no-]local          use repository config file
    --[no-]worktree       use per-worktree config file
    -f, --[no-]file <file>
                          use given config file
    --[no-]blob <blob-id> read config from given blob object
Action
    --[no-]get            get value: name [value-pattern]
    --[no-]get-all        get all values: key [value-pattern]
    --[no-]get-regexp     get values for regexp: name-regex [value-pattern]
    --[no-]get-urlmatch   get value specific for the URL: section[.var] URL
    --[no-]replace-all    replace all matching variables: name value [value-pattern]
    --[no-]add            add a new variable: name value
    --[no-]unset          remove a variable: name [value-pattern]
    --[no-]unset-all      remove all matches: name [value-pattern]
    --[no-]rename-section rename section: old-name new-name
    --[no-]remove-section remove a section: name
    -l, --[no-]list       list all
    --[no-]fixed-value    use string equality when comparing values to 'value-pattern'
    -e, --[no-]edit       open an editor
    --[no-]get-color      find the color configured: slot [default]
    --[no-]get-colorbool  find the color setting: slot [stdout-is-tty]
Type
    -t, --[no-]type <type>
                          value is given this type
    --bool                value is "true" or "false"
    --int                 value is decimal number
    --bool-or-int         value is --bool or --int
    --bool-or-str         value is --bool or string
    --path                value is a path (file or directory name)
    --expiry-date         value is an expiry date
Other
    -z, --[no-]null       terminate values with NUL byte
    --[no-]name-only      show variable names only
    --[no-]includes       respect include directives on lookup
    --[no-]show-origin    show origin of config (file, standard input, blob, command line)
    --[no-]show-scope     show scope of config (worktree, local, global, system, command)
    --[no-]default <value>
                          with --get, use default value when missing entry
    --[no-]comment <value>
                          human-readable comment string (# will be prepended as needed)

D:\simonprojects\websites\pm-site>git config -global http.sslVerify false
error: did you mean `--global` (with two dashes)?

D:\simonprojects\websites\pm-site>git config --global http.sslVerify false

D:\simonprojects\websites\pm-site>git push
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 18 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 426 bytes | 426.00 KiB/s, done.
Total 4 (delta 3), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To https://github.com/ShiMingXuanSimon/Site-PointsManagement.git
   b46314f..2103441  main -> main

D:\simonprojects\websites\pm-site>git config --global http.sslVerify true

D:\simonprojects\websites\pm-site>
```