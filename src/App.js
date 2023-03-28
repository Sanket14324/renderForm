const { useState, useEffect } = require("react");
//const [renderForm,setRenderForm] = useState([])

const {
  TextField,
  FormGroup,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Checkbox,
  Rating,
  Input,
  Card,
  Typography,
} = require("@mui/material");

function App() {
  const [renderForm, setRenderForm] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    email: "",
    gender: "",
    feedback: "",
  });

  const [responseData, setResponseData] = useState({});

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setResponseData((prevResponseData) => ({
      ...prevResponseData,
      [name]: value,
    }));
  };

  const [survey, setSurvey] = useState()

  useEffect(() => {
    getForm().then(
      async response => await setSurvey(response)

    );
  }, []);


  const getForm = async () => {
    const response = await fetch(
      "https://api.qa.gessa.io/cms/survey/641d9a27c6baefa8ef32a937",
      {
        headers: {
          "x-tenant-id": "63f72c21f9dfbe6751b887b5",
          "content-type": "application/json"
        }
      }
    );

    const totalForm = await response.json();

    //setFormData(totalForm);
    setRenderForm(totalForm)

    console.log(totalForm);
    return totalForm;

  }
  const [value, setValue] = useState(2);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [options, setOptions] = useState([]);

  const handleChange = (event) => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  };

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(options);
    console.log(value);
    console.log(selectedFile);
    console.log(selectedDate);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      // replace the URL below with the endpoint you want to upload the file to
      fetch("https://example.com/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File uploaded successfully.");
          } else {
            console.error("Error uploading file.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Send form data to server
  };

  const isExpried = async (date) => {
    return false;
  }
  return (
    <div
      style={{
        backgroundColor: "lightblue",
        width: "60%",
        height: "100%",
        marginTop: "5%",
        marginLeft: "20%",
        paddingLeft: "2%",
        marginRight: "2%",
        paddingBottom: "5%",
        paddingTop: "3%",
        marginBottom: "5%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{
            backgroundColor: "white",
            paddingBottom: "30%",
            width: "60%",
            height: "100%",
            padding: "30px",
            alignItems: "center",
            marginLeft: "15%",
            marginRight: "50%",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            sx={{
              width: "100%",
              textAlign: "center",
            }}
          >
            {survey?.result.title}
          </Typography>

          <Card
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              fullWidth
              required
              margin="normal"
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          </Card>
          <br></br>
          <Card sx={{ width: "100%", height: "100%" }}>
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              fullWidth
              required
              margin="normal"
            />
          </Card>
          <br></br>

          {
            (() => {
              // isExpried(survey?.result.expiry)
              if (false) {

              }
              else {
                return survey?.result.form.map(
                  (question) => {

                    if (question.questionType === 'text') {
                      return (

                        <>
                          <Card key={question?.id} sx={{ width: "100%", height: "100%" }}>
                            <TextField
                              label={question.question}
                              id={question?.id}
                              value={formData.feedback}
                              onChange={(e) =>
                                setFormData({ ...formData, feedback: e.target.value })
                              }
                              fullWidth

                              margin="normal"
                            />
                          </Card>
                          <br /><br />
                        </>
                      );
                    }
                    else if (question.questionType === "multipleChoice") {
                      return (
                        <Card key={question?.id} sx={{ width: "100%", height: "100%" }}>
                          <FormGroup>
                            <FormLabel component="legend">
                              {question.question}
                            </FormLabel>

                            {
                              question.options.map(
                                (option) => {

                                  return (
                                    <FormControlLabel
                                    key={option.id}
                                      control={
                                        <Checkbox
                                        
                                          defaultChecked={false}
                                          id={(option.id).toString()}

                                          onChange={handleChange}
                                          name={option.text}
                                        />
                                      }
                                      label={option.text}
                                    />
                                  )
                                }
                              )
                            }

                          </FormGroup>
                        </Card>
                      )

                    }
                    else if (question.questionType === 'radio') {

                      return (
                        <>
                          <Card key={question?.id} sx={{ width: "100%", height: "100%" }}>
                            <FormControl component="fieldset" sx={{ mt: 3 }}>
                              <FormLabel component="legend">{question.question}</FormLabel>
                              <RadioGroup
                                value={formData.gender}
                                onChange={(e) =>
                                  setFormData({ ...formData, gender: e.target.value })
                                }
                              >
                                {
                                  question.options.map(
                                    (option) => {

                                      return (
                                        <FormControlLabel
                                          key={option.id}
                                          id={option.id}
                                          value={option.text}
                                          control={<Radio />}
                                          label={option.text}
                                        />
                                      );
                                    }
                                  )
                                }
                              </RadioGroup>
                            </FormControl>
                          </Card>
                          <br></br>
                        </>
                      )

                    }
                    else if (question.questionType === 'file') {
                      return <>
                        <Card
                          key={question?.id}
                          sx={{
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Typography variant="h6">Upload a File</Typography>
                          <Input type="file" onChange={handleFileSelect} />
                          <Button type="submit" disabled={!selectedFile}>
                            Upload
                          </Button>
                        </Card>
                        <br></br>

                      </>
                    }
                    else if (question.questionType === 'date') {
                      return (
                        <>
                          <Card
                            key={question?.id}
                            sx={{
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <TextField
                              type="date"
                              variant="outlined"
                              value={selectedDate}
                              onChange={handleDateChange}
                            />
                          </Card>
                          <br></br>
                        </>
                      )
                    }
                    else if (question.questionType === 'rating') {
                      return (
                        <>
                          <Card
                            key={question?.id}
                            sx={{
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <div>
                              <Rating
                                name="basic-rating"
                                value={value}
                                onChange={(event, newValue) => {
                                  setValue(newValue);
                                }}
                              />
                            </div>
                          </Card>
                        </>
                      )
                    }


                  }
                )
              }

            })()

          }
          <Button
            type="submit"
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4%",
              marginLeft: "40%",
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default App;
