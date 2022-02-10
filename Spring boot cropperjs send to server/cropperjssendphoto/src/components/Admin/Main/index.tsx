import React, {useRef, useState} from 'react';
import {
    Form,
    Input,
    Row,
    Col,
    Checkbox,
    Button,
    Typography,
    Upload,
    Modal,
  } from 'antd';
  import Cropper from "cropperjs";
  import { InboxOutlined } from '@ant-design/icons';
  import "cropperjs/dist/cropper.min.css";
import axiosService from '../../../services/axiosService';
import { useNavigate } from 'react-router-dom';
  const { Title } = Typography;
  

  
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  export interface FileObj
  {
      uid: string,
      originFileObj: File
  }
  export interface FileInfo 
  {
      code: string,
      uid?:string
  }

  export interface FileData 
  {
      file: FileObj,
      fileList: FileList,
  }

  export interface CarData 
  {
      Model: string,
      Brand: string,
      Price: Number,
      Files: string
  }

  export interface CarDataForm
  {
      Model: string,
      Brand: string,
      Price: Number
  }

const Main: React.FC = () => 
{
    const navigation = useNavigate();
    const [cropperObj, setCropperObj] = useState<Cropper>();
    const imageRef = useRef<HTMLImageElement>(null);
    const imagePreview = useRef<HTMLImageElement>(null);
    const [filesCode, setfilesCode] = useState<Array<FileInfo>>(new Array<FileInfo>());
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
  

    const onFinish = (values: CarDataForm) => {
      let sendObject: CarData = {
        Model: values.Model,
        Brand: values.Brand,
        Price: values.Price,
        Files: JSON.stringify(filesCode)
      };

      axiosService.add(sendObject);
      navigation("/");
    };


    const [files, setFiles] = useState<FileData>();
    const normFile = (e: FileData) => {
        setFiles(e);
        if (Array.isArray(e)) {
            
            return e;
        }

        return e && e.fileList;
    }
    
      const SuccessLoad = async ({file, onSuccess}:any) => 
      {
        await setVisible(true);
        var cropper = cropperObj ? cropperObj : new Cropper(imageRef.current as HTMLImageElement, {
            aspectRatio: 1/1,
            viewMode:1,
            preview: imagePreview.current as HTMLImageElement
        });
        cropper?.replace(URL.createObjectURL(file));
        setCropperObj(cropper);
        
       
        setTimeout(() => {
            onSuccess("ok");
          }, 0);   
      }
    
      const onOkHanler = () => 
      {
        let cropped: string = cropperObj?.getCroppedCanvas().toDataURL() as string;
        filesCode.push({code: cropped, uid: files?.file.uid});
      }

      const handleRemove = async(file: any) => 
      {
        let removedFile:FileObj = file;
        let files:Array<FileInfo> = filesCode.filter(el => el.uid != removedFile.uid);
        
        await setfilesCode(files);
      }

    return (<>
        
        <Title level={3} style={{
            margin: "10px",
            textAlign: 'center'
        }}>Додавання нового автомобіля</Title>     
              
        <Row style={
            {
                margin: "30px"
            }
        }>
            <Col md={3} xs={0}></Col>
            <Col md={13} xs={24}>
            
                <Form
                    {...formItemLayout}
                    form={form}
                    name="addCarForm"
                    onFinish={onFinish}
                    scrollToFirstError
                    size='large'
                >

                    <Form.Item
                        name="Brand"
                        label="Бренд автомобіля"
                        tooltip="Поле для імені"
                        rules={[{ required: true, message: 'Будь ласка, введіть бренд автомобіля', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="Model"
                        label="Модель автомобіля"
                        tooltip="Поле для імені"
                        rules={[{ required: true, message: 'Будь ласка, введіть модель автомобіля', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="Price"
                        label="Ціна автомобіля"
                        tooltip="Поле для ціни"
                        rules={[{ required: true, pattern:/^[0-9]+$/, message: 'Будь ласка, введіть ціну',  whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Фотографії">
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger name="files" onRemove={handleRemove} customRequest={SuccessLoad}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Натисніть або перенесіть файл</p>
                                <p className="ant-upload-hint">Підтримується перекидання лише однієї фотографії.</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Натисніть на чекбокс!')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            Я підтверджую додавання нового автомобіля
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Додати новий автомобіль
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col md={4} xs={0}></Col>

        </Row>

        
        <Modal
            title="Редагування фотографії"
            centered
            visible={visible}
            onOk={() => {
                onOkHanler();
                setVisible(false)}}
            width={1000}
            closable={false}
            okText="Підтвердити"
            cancelButtonProps={{ disabled: true, style:{display:'none'} }}
        >
            <Row>
                <Col md={16} xs={24}>
                    <img ref={imageRef} width="100%"/>
                </Col>
                <Col offset={2} md={6} xs={24}>
                    <div style={{
                        height: "150px",
                        border: "1px solid silver",
                        overflow: "hidden"
                    }} ref={imagePreview}>
                        
                    </div>
                </Col>
            </Row>
        </Modal>
    </>);
}

export default Main;