# PowerShell script to rewrite commit messages
$commits = @(
    "e9f2d98",
    "58b3524", 
    "f410650",
    "4e57f36",
    "00b4707",
    "a4128b0",
    "b00ea48",
    "41c0a64",
    "40c1674",
    "5e107e1",
    "b72d899",
    "59861fd"
)

$newMessages = @(
    "fix github pages deploy thingy lol",
    "added permissions to workflow i think?",
    "removed packageManager stuff and fixed deps",
    "put back the original package.json",
    "removed packageManager to fix yarn version",
    "removed live demo from readme",
    "added github actions for auto deploy",
    "added dist folder for gh pages",
    "put badges back in readme",
    "restored the old readme version",
    "made readme super simple",
    "simplified readme - shorter and english"
)

# Interactive rebase to rewrite commits
Write-Host "Starting interactive rebase to rewrite commit messages..."
Write-Host "This will open an editor for each commit. Replace the commit messages with the new ones."
Write-Host "Press Enter to continue..."
Read-Host

# Start interactive rebase
git rebase -i HEAD~12
