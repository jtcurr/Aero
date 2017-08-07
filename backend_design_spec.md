Here is where your spec/explanation to the tinychat backend developer goes.

Here is a list of several routes that we are going to need to make tinychat work:
	- POST
	- UPDATE

We can run this server for now but we should get an express server up:
python -m SimpleHTTPServer 8080

The data coming back from the server needs to be in the form:

	[
		{
			id: Integer,
			name: String,
			timestamp: Date(in epoch seconds rounded to nearest integer),
			content: String
		}
	]