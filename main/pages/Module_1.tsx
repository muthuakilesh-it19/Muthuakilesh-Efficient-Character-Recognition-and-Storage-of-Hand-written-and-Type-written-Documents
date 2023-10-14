import { useEffect, useRef, useState } from 'react';
import { Group, Stack, Text, Image, Progress, Button } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { createWorker } from 'tesseract.js';
import Navbar from './Navbar'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { GetServerSideProps } from 'next';
import { prisma } from '../lib/prisma';
import { useRouter } from 'next/router';

interface Entries{
  entries:{
    id:string
    name:string
    roll:string
    title:string
    guide:string
  }[]
}

interface FormData{
  name: string
  roll:string
  title:string
  guide:string
  id:string
}
const Module_1 = ({entries}:Entries) => {
  const [imageData, setImageData] = useState<null | string>(null);
  const loadFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      setImageData(imageDataUri as string);
    };
    reader.readAsDataURL(file);
  };

  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('idle');
  const [ocrResult, setOcrResult] = useState('');
  const [name1,setName]=useState('');
  const [roll1,setRoll]=useState('');
  const [title1,setTitle]=useState('');
  const [guide1,setGuide]=useState('');


 
  const [form,setForm]= useState<FormData>({ name:'',roll: '',title: '',guide: '',id:''})

  const router=useRouter()

  const refreshData=()=>{
    router.replace(router.asPath)
  }

  const workerRef = useRef<Tesseract.Worker | null>(null);
  useEffect(() => {
    workerRef.current = createWorker({
      logger: message => {
        if ('progress' in message) {
          setProgress(message.progress);
          setProgressLabel(message.progress == 1 ? 'Done' : message.status);
        }
      }
    });
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    }
  }, []);

  const handleExtract = async () => {
    setProgress(0);
    setProgressLabel('starting');

    const worker = workerRef.current!;
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    
    const response = await worker.recognize(imageData!);
    setOcrResult(response.data.text);
   // console.log(response.data);

    for(let i=0;i<response.data.text.length;i++)
    {
      if(response.data.text[i]=='N'&&response.data.text[i+1]=='a' && response.data.text[i+2]=='m' && response.data.text[i+3]=='e')
      {
      
        let str="";
        let j=i+7;
        while(response.data.text[j]!='\n')
        {
          str=str.concat(response.data.text[j]);
          j++;
        }
        setName(str);
       // setForm({...form,name: str});
      }
      if(response.data.text[i]=='N'&&response.data.text[i+1]=='u' && response.data.text[i+2]=='m' && response.data.text[i+3]=='b' && response.data.text[i+4]=='e' && response.data.text[i+5]=='r')
      {
        let str1="";
        let j=i+9;
        while(response.data.text[j]!='\n')
        {
          str1=str1.concat(response.data.text[j]);
          j++;
        }
        setRoll(str1);
       // setForm({...form,roll: str1});
      }
      if(response.data.text[i]=='T'&&response.data.text[i+1]=='i' && response.data.text[i+2]=='t' && response.data.text[i+3]=='l' && response.data.text[i+4]=='e')
      {
        let str2="";
        let j=i+8;
        while(response.data.text[j]!='\n')
        {
          str2=str2.concat(response.data.text[j]);
          j++;
        }
        setTitle(str2);
       // setForm({...form,title: str2});
      }
      if(response.data.text[i]=='G'&& response.data.text[i+1]=='u' && response.data.text[i+2]=='i' && response.data.text[i+3]=='d' && response.data.text[i+4]=='e')
      {
        let str3="";
        let j=i+8;
        while(response.data.text[j]!='\n')
        {
          str3=str3.concat(response.data.text[j]);
          j++;
        }
        setGuide(str3);
        //setForm({...form,guide: str3});
      }
    }
    setForm({...form,name: name1,roll: roll1,title: title1,guide: guide1});
   
    console.log(form);
   
    
    
    
  };

  async function create(data:FormData){
    try{
      fetch('http://localhost:3000/api/create',{
        body: JSON.stringify(data),
        headers: {
          'Content-Type':'application/json'
        },
        method:'POST'
      }).then(()=>{
        setForm({name: '',roll:'',title:'',guide:'',id:''})
        refreshData()
    }
      )
    }catch(error){
      console.log(error);
    }
  }

  const handleSubmit= async (data:FormData)=>{
    try{
      create(data)
    }catch(error){
      console.log(error);
    }
  }

  return (<>
    <Navbar/>
    <Group align='initial' style={{ padding: '10px' }}>
      <Stack style={{ flex: '1' }}>
        <Dropzone
          onDrop={(files) => loadFile(files[0])}
          accept={IMAGE_MIME_TYPE}
          multiple={false}
        >{() => (
          <Text size="xl" inline>
            Drag image here or click to select file
          </Text>
        )}</Dropzone>

        {!!imageData && <Image src={imageData} style={{ width: '100%' }} />}
      </Stack>

      <Stack style={{ flex: '1' }}>
        <Button disabled={!imageData || !workerRef.current} onClick={handleExtract}>Extract</Button>
        <Text>{progressLabel.toUpperCase()}</Text>
        <Progress value={progress * 100} />

        {!!ocrResult && <Stack>
          <Text size='xl'>RESULT</Text>
          <Text style={{ fontFamily: 'monospace', background: 'black', padding: '10px' }}>{ocrResult}</Text>
          <Text style={{fontFamily: 'monospace',background: 'black'}}>{name1}<br/>{roll1}<br/>{title1}<br/>{guide1}</Text>
          <form onSubmit={e=>{
            e.preventDefault()
            handleSubmit(form)
          }}>
            <button type="submit" className='btn btn-primary'>Add +</button>
          </form>
          <div className="card" style={{width: '50rem'}}>
            <ul className="list-group list-group-flush">
              {entries.map(entry=>(
                <li key={entry.id} className='list-group-item' style={{float:'left',
                  margin:'0 5px'}}>
                  <h5>{entry.name}</h5><h5>{entry.roll}</h5><h5>{entry.title}</h5><h5>{entry.guide}</h5>
                </li>
              ))}
            </ul>
          </div>
        </Stack>}

      </Stack>
    </Group>
  </>);
}

export default Module_1;


export const getServerSideProps: GetServerSideProps= async()=>{
  const entries=await prisma.entry.findMany({
    select:{
      name:true,
      roll:true,
      title:true,
      guide:true,
      id:true

    }
  })

  return {
    props:{
      entries
    }
  }
}