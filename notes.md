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

### Website Information
* **Link to Website:** https://ideashare.click

### Notes from Creating Webserver
* Must release Elastic IP Address to stop being charged for it.
* Elastic IP Address allows you to maintain the same Public IP 
Address even after terminating the instance.
* t3.nano is the minimum instance size to meet requirements for 
website. Will probably need more.
* Command for shelling into server: *ssh -i [key pair file] ubuntu@[ip address]*

### HTTPS, TLS, and web certificates
* HTTPS is a secure version of HTTP, where the data is encrypted using the TLS protocol.
* Web certificates allow for the use of HTTPS.
* You can use AWS Route 53 to lease domain names and manage DNS records.

### Useful HTML Information
* To embed a link: \<a href="link_to_website">Embedded Text\</a>
* To display an image: \<img alt="placeholder text" src="image_link" width=100>
* Input elements have the following attributes: 
  * name - The name of the input.
  * disabled - Disables the ability for the user to interact with the input.
  * value - The initial value of the input.
  * required - Signified that a value is required to be valid.
* HTML Media Elements: img, audio, video, svg, and canvas.
* To display a video: \<video controls width="300" crossorigin="anonymous" src="video_link"> \</video>
* Forms typically include divisions, which include labels, inputs, buttons, etc.
* 