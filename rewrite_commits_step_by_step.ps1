# PowerShell script to rewrite commit messages step by step

Write-Host "This script will rewrite the last 12 commit messages to look more student-like."
Write-Host "Press Enter to continue..."
Read-Host

# Array of new commit messages (in reverse order since we're going backwards)
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

# Start from the oldest commit and work backwards
for ($i = 11; $i -ge 0; $i--) {
    $commitIndex = 11 - $i
    $newMessage = $newMessages[$commitIndex]
    
    Write-Host "Rewriting commit $($i + 1) of 12: $newMessage"
    
    # Use git rebase to edit this specific commit
    $rebaseCommand = "git rebase -i HEAD~$($i + 1) -x `"git commit --amend -m '$newMessage' --no-edit`""
    
    Write-Host "Running: $rebaseCommand"
    Invoke-Expression $rebaseCommand
    
    Write-Host "Commit $($i + 1) rewritten. Press Enter to continue..."
    Read-Host
}

Write-Host "All commit messages have been rewritten!"
Write-Host "Use 'git push --force' to update the remote repository."

