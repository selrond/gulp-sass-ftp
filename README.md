# gulp-sass-ftp
A simple gulp workflow to upload compiled sass files to FTP

## Instructions

1. Clone this repo
2. Run `npm install` in repo root
3. In `var conn` change the `host`, `user` and `password` properties:
```js
	var conn = ftp.create( {
		host:     'host.tld',
		user:     'user.host.tld',
		password: 'securepassword',
		...
```
4. Run `gulp` in repo root