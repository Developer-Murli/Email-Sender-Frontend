import React,{useRef, useState} from 'react';
import toast from 'react-hot-toast';
import { sendEmail } from '../services/email.service';
import {Editor} from '@tinymce/tinymce-react';

function EmailSender(){

  const[emailData, setEmailData] = useState({
    to:" ",
    subject:" ",
    message:" "
  });

  const[loading, setLoading] = useState(false);

  //for Tiny MCE Editor ref
  const editorRef= useRef(null);

  function handleFieldChange(event , name){
    setEmailData({...emailData,[name]:event.target.value});

  }

  async function handleSubmit(event){
    event.preventDefault();
    console.log(emailData);

    if(emailData.to==" " || emailData.subject==" " || emailData.message==" "){
     toast.error("All fields are required");
      return;
      }
    // Send Mail by API

    try {
      //setSending(true);
      setLoading(true);
      await
      sendEmail(emailData)
      toast.success("Email Sent Successfully");
      toast.success("Send Another One :)")
      setEmailData({
      to:" ",
      subject:" ",
      message:" "
      });
      editorRef.current.setContent("");
      
    } catch (error) {
      toast.error("Emal not Sent");
      console.log(error);
    }finally{
      setLoading(false);
    }


    console.log(emailData);
   
  }



  return (
    <div className='w-full min-h-screen dark:bg-gray-900 flex justify-center items-center'>
       <div className='email_card   p-4 rounded border-t-4 mx-8 md:mx-0s  sm:w-full lg:w-2xl  border-t-blue-600 shadow-2xl dark:bg-gray-950 bg-white'>
       <h1 className='text-gray-800 text-2xl dark:text-white mt-3'>Email Sender</h1>
       <p className='text-gray-600'>Send Email to your own Members</p>
       
      
      <form action="" onSubmit={handleSubmit}>
        
           {/* //Email Field */}
           {/* <div className="mb-5 mt-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To</label>
            <input 
            type="email" 
            id="email" 
            value={emailData.to}
            onChange={(event)=>handleFieldChange(event,"to")}

            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required />
          </div> */}
          <div class="relative z-0 w-full mb-5 group mt-5">
            <input type="email" id="email" 
            value={emailData.to}
            onChange={(event)=>handleFieldChange(event,"to")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Whom to send Email</label>
        </div>



           {/* //Subject Field */}
            <div className="relative z-0 w-full mb-5 group mt-5">
            <input type="text" 
            id="subject" 
            name='subject'
            value={emailData.subject}
            onChange={(event)=>handleFieldChange(event, "subject")}
           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="subject" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter Subject </label>
        </div>


        {/* <div class="relative z-0 w-full mb-5 group">
            <input type="text" id="subject" 
            value={emailData.subject}
            onChange={(event)=>handleFieldChange(event,"Subject")}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="subject" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Subject </label>
        </div> */}

        



           {/* //Message Field */}

            <div className="mb-5">

              <label htmlFor="message" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
              <Editor
                    apiKey='wyma813pfxktgclpuotbmgw27aeu87dbg2hha0zswk46jo5m'
                      
                    onEditorChange={(event)=> {
                      setEmailData({...emailData,
                      message:editorRef.current.getContent(),
                    });
                  }}

                    onInit={(evt, editor) => {editorRef.current=editor}}


                    init={{
                      height: 300,
                      plugins: [
                        // Core editing features
                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                        // Your account includes a free trial of TinyMCE premium features
                        // Try the most popular premium features until Oct 18, 2025:
                        'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown','importword', 'exportword', 'exportpdf'
                      ],
                      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                      tinycomments_mode: 'embedded',
                      tinycomments_author: 'Author name',
                      mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                      ],
                      ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                      uploadcare_public_key: '04a042e8e51e28599820',
                    }}
                    initialValue="Welcome to Smart Email Sender!!"
                  />


            </div>
            
           
          
            {/* <textarea 
            value={emailData.message}
            onChange={(event)=> handleFieldChange(event,"message")}

             
            
            id="message" 
            rows="7" 
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea> */}

           
            
            
            {/* //Loader */}

            {loading && <div className='text-center mt-2.5'>
             <div role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>
          <h1>Sending Email...</h1>

            </div>}
            <div className="button mt-6 text-center">


            <button disabled={loading} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" type='submit'>
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Send Mail
            </span>
            </button>

            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" type='reset'>
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
            Reset
            </span>
            </button>

            </div>
        
        
   
      </form>





       
       </div>
    </div>
  );

}
export default EmailSender;
