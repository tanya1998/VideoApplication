# VideoApplication

**HOW TO BUILD:-**
1. `cd VideoApplication`
2. `docker compose up`

The Frontend will be served on `localhost:8080` and the backend server is listening on `localhost:8081`

**ERROR WHILE BUILDING:-**
In case of error with Java Spring Boot dockerize, Please follow below:-
1. Change pom.xml to java version in your local system.
2. `mvn clean package`
3. re-run the `docker compose up`



**Backend APIs (localhost:8081)**
  1. UploadFiles - /files [Input {MultiPart File, Double Duration}][Output {OK - File Uploaded}]
  2. GetFiles - /files [Input {None}][Output {List<File>}]
  3. DowloadFile - /files/fileid [Input {String FileId}][Output {Blob Video}]
  4. GetFileDetails -  /files/details/fileid [Input {String FileId}][Output {VideoDTO Details}]
  5. GetFilesByName - /files/name/filename [Input {String Filename}][Output {List<VideoDTO>}]
  6. GetFilesByDuration - /files/duration/min_duration/max_duration  [Input {Double min_duratiob, Double max_duration}][Output {List<VideoDTO>}]
  7. DeleteFile - /files/fileid [Input {String FileId}][Output {NO_CONTENT - File Deleted}]

**Frontend APIs (localhost:8080)**
  1. / -> Routed to All files
  2. /files -> Routed to the Get Files Component
  3. /uploadfiles -> Routed to the Upload Files Component
  4. /fileDetails/id -> Routed to the GetFileDetail Component.

**Database (h2 database on springboot - on demand creation if Table [VIDEO])**

**Columns:-**
  1. Video - Bytes array
  2. Duration - Double
  3. Type - String
  4. Name - String
  5. Upload Date - Date type

**Error Handling:-**
  1. Existing File Error on same file name upload.
  2. File Not found in case of get and delete of non-uploaded files(only by id).
  3. File type error in case of trying to upload !(.mp4, .mmpeg) types.
  4. Bad request error otherwise.

**Bonus Features:-**
1. Progress bar while uploading the video
2. Preview of video before upload available
3. View details of every video
4. Search by name/duration of videos. (Not exact and ignorecase)
  
