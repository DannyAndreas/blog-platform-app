import React, { useState } from 'react'
import { Form, Input, Button, Space, Tag } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import './ArticleForm.css'

const ArticleForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [tagList, setTagList] = useState(initialValues.tagList || [])
  const [tagInput, setTagInput] = useState('')

  const handleAddTag = () => {
    if (tagInput && !tagList.includes(tagInput)) {
      setTagList([...tagList, tagInput])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTagList(tagList.filter((tag) => tag !== tagToRemove))
  }

  const handleFinish = (values) => {
    onSubmit({ ...values, tagList })
  }

  return (
    <Form initialValues={initialValues} onFinish={handleFinish}>
      <p className="bold">Title</p>
      <Form.Item
        className="title"
        name="title"
        rules={[{ required: true, message: 'Please input the title of the article' }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <p className="bold">Short description</p>
      <Form.Item
        className="description"
        name="description"
        rules={[{ required: true, message: 'Please input a short description' }]}
      >
        <Input.TextArea placeholder="Short Description" />
      </Form.Item>
      <p className="bold">Text</p>
      <Form.Item
        className="body"
        name="body"
        rules={[{ required: true, message: 'Please input the content of the article' }]}
      >
        <Input.TextArea className="body-input-text" placeholder="Article Content" />
      </Form.Item>
      <p className="bold">Tags</p>
      <Form.Item className="tags">
        <Space>
          <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Tag" />
          <Button type="dashed" onClick={handleAddTag} icon={<PlusOutlined />}>
            Add Tag
          </Button>
        </Space>
        <div className="tags-container">
          {tagList.map((tag) => (
            <div className="oneTagInContainer" key={tag}>
              <Tag>{tag}</Tag>
              <Button
                type="dashed"
                icon={<MinusOutlined />}
                onClick={() => handleRemoveTag(tag)}
                style={{ marginLeft: 8 }}
              >
                Delete Tag
              </Button>
            </div>
          ))}
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ArticleForm
