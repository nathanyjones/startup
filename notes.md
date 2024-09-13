# CS 260 Notes
README File: https://github.com/nathanyjones/startup/blob/b0f6172ec1e47766a126cde6ca2f11438c4be939/README.md
### Creating Repositories
#### To create a GitHub repository:
1. Login to GitHub
2. Press *New Repository*
3. Give the repository a name and description
4. Mark the *Public* option
5. Add the default *README.md* file
6. Choose a license (MIT License)

### Useful Git Commands
* *git add \<filename>*
   - Adds the specified file to GitHub.
* *git commit -am \<"update notes">*
   - Commits changes made to a file.
* *git push*
  * Pushes committed changes to GitHub

### Handling a Merge Conflict
#### To handle a merge conflict:
1. Open the file in an editor.
2. Modify the file to remove textual conflict delimeters.
3. Modify the file to keep the changes we want from both commits.
4. Commit the resolution and push up the result.

## Website Information
* **Website IP Address:** 54.172.78.100
* **Link to Website:** http://54.172.78.100/
#### Notes from Creating Webserver
* Must release Elastic IP Address to stop being charged for it.
* Elastic IP Address allows you to maintain the same Public IP 
Address even after terminating the instance.
* t3.nano is the minimum instance size to meet requirements for 
website. Will probably need more.
* Command for shelling into server: *ssh -i [key pair file] ubuntu@[ip address]*

