import { Modal, Table, Button, message } from 'antd'
import { repairPerson } from '../../api/repair'
import type { TableProps } from 'antd'
import { useEffect, useState } from 'react'
import { repairAssigned } from '../../api/repair'


interface DataType {
    no: string,
    name: string,
    tel: string,
}
interface PropsType { //props的type
    visible: boolean,
    hideModal: () => void,
}


function RepairForm(props: PropsType) {
    const { visible, hideModal} = props
    const [list, setList] = useState<DataType[]>([])

    useEffect(() => {
        loadPersonData()
    }, [])


    const loadPersonData = async () => {
        const { data: { list } } = await repairPerson()
        setList(list)
    }

    const handleClick = async (no: string) => {
        const { data } = await repairAssigned(no)
        message.success(data)
        loadPersonData()
        
        hideModal()
    }

    const columns: TableProps<DataType>['columns'] = [  //表头
        {
            title: "No.",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: '工号',
            dataIndex: 'no',
            key: 'no',

        },
        {
            title: '维修人',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '维修人电话',
            dataIndex: 'tel',
        },

        {
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            render(value, record) {
                return (
                    <Button type='primary' onClick={() => handleClick(record.no)}>指派</Button>
                )
            }
        }
    ];
    return (
        <Modal
            title='派指'
            open={visible}
            onCancel={hideModal}
            width={800}
            onOk={hideModal}

        >

            <Table
                columns={columns}
                dataSource={list}
            />

        </Modal>
    )
}

export default RepairForm