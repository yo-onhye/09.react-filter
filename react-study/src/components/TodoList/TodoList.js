import React from 'react';

const TodoList = ({
  items,
  isLoading,
  isTitleCheck,
  onAllCheck,
  onSingleCheck,
}) => {

  return (
    <section className='todoTbl'>
        {isLoading &&
          <h3 style={{ textAlign: 'center' }}>데이터 로딩 중 입니다....</h3>
        }

        {!isLoading &&
          items.length > 0 &&
          <table>
            <caption><span className='blind'>To do 데이터 테이블</span></caption>
            <colgroup>
              <col width='10%' />
              <col width='15%' />
              <col width='55%' />
              <col width='20%' />
            </colgroup>

            <thead>
              <tr>
                <th scope='col'>Id</th>
                <th scope='col'>User Id</th>
                <th scope='col'>Title</th>
                <th scope='col'>
                  <span className='todoChk'>
                    <input 
                      type='checkbox'
                      id='lb_tit'
                      defaultChecked={isTitleCheck}
                      value='Completed'
                      onChange={onAllCheck}
                    ></input>
                    <label htmlFor='lb_tit'>
                      Completed
                    </label>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>

            {items.map((item) => 
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
                <td>
                  <span 
                    className='todoChk'
                  >
                    <input
                      type='checkbox' 
                      id={`lb${item.id}`}
                      defaultChecked={item.completed}
                      value={item.title} 
                      onChange={e => onSingleCheck(item.id)}
                    ></input>
                    <label htmlFor={`lb${item.id}`}>
                      {item.title} Completed
                    </label>
                  </span>
                </td>
              </tr>)
            }
            </tbody>
          </table>
        }

        {
          items.length === 0 &&
          <h3 style={{ textAlign: 'center' }}>데이터가 없습니다.</h3>
        }
      </section>
  )
};

export default TodoList;