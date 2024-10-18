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
* **Link to Website:** https://startuo.ideashare.click

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
* To display an image with a hyperlink, wrap the \<img> element in an \<a> tag with the href attribute set to the link.
* Other Useful Tags:
  * Paragraph: \<p>
  * Ordered List: \<ol>
  * Unordered List: \<ul>
  * First Level Heading: \<h1>
  * Second Level Heading: \<h2>
  * Third Level Heading: \<h3>
* To declare a document as an HTML document: <i> \<!DOCTYPE html> <\i>
* Use the \<script> tag to include JavaScript in the HTML file.

### Useful CSS Information
* The # selector allows you to target elements by ID.
* The . selector allows you to target elements by class.
* Margin is the space around an element's border (placement of elements on screen).
* Padding is the space between the element's border and the element's content (placement of content within an element).
* flex: 0 80px --> indicates that the element does not grow (0) with a starting height of 80px.
* Media queries (@media) allow us to properly resize for smaller screens.
* CSS Box Model from inside out: Content -> Padding -> Border -> Margin 

### Useful JavaScript Information
* Arrow functions syntax: <i>const FunctionName = (parameter(s)) => {function_body return result;}<\i>
* The DOM is an object representation of the HTML elements that the browser uses to render the display. We can modify the DOM
using JavaScript, and functions like insertChild, deleteElement, etc.
* Default value of display property for span elements is 'inline'.
* To update the text color of an element with id="byu": document.getElementById("byu").style.color = "green";
* To add new properties to JavaScript objects, you either use dot notation or bracket notation. Ex. object.height = 10;
* If statements, for loops, and while loops all have the same formatting as in Java/C++.
* Switch statements are similar to if statements. switch(expression) {case value1: ... break case value2: ... break default: ...}
* Promises:
  * Pending: Initial state, operation is not yet completed.
  * Fulfilled: Operation was successfully completed, and the promise has a resolved value.
  * Rejected: The operation failed, and the promise has a reason for the failure (error).
  * .then(): Attaches a callback for a fulfilled promise.
  * .catch(): Attaches a callback for a rejected promise.
  * .finally(): Attaches a callback that will be executed regardless of the outcome of the promise.

### Useful Terminal Commands
* ssh - Used to create a remote shell session.

### Miscellaneous Info
* Ex. banana.fruit.bozo.click Breakdown:
  * Top Level Domain: .click
  * Root Domain: bozo.click
  * Subdomains: banana.fruit.bozo.click, fruit.bozo.click
* A DNS A record can only point to an IP address
* Ports:
  * Port 80 - Reserved for HTTP
  * Port 443 - Resereved fore HTTPS
  * Pot 22 - Reserved for SSH (Secure Shell)
