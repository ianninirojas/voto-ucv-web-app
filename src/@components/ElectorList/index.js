import React, { Component } from 'react';

import Highlighter from 'react-highlight-words';

import {
  Row,
  Col,
  Card,
  Icon,
  Form,
  Input,
  Table,
  Button,
  Select,
  Divider,
} from 'antd';

import {
  Spinner
} from '../../@components';

import {
  facultyService,
  schoolService,
  electoralEventService
} from '../../@services';

class ElectorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      loadingElectors: false,
      loadingFaculties: false,
      lodingElectoralEvent: false,
      electoralEventPublickey: this.props.match.params.electoralEventPublickey,
      electoralEvent: '',
      electors: [],
      groupElectors: [],
      faculties: [],
      typeElectorSelected: 'all',
      facultySelected: 'all',
      schoolSelected: 'all',
    }

    this.columns = [
      {
        title: 'Electores',
        key: 'elector',
        dataIndex: 'elector',
        align: 'center',
        ...this.getColumnSearchProps('elector')
      }
    ];
  }

  groupBy = key => array =>
    array.reduce(
      (objectsByKeyValue, obj) => ({
        ...objectsByKeyValue,
        [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
      }),
      {}
    );

  componentDidMount = async () => {
    this.getElectoralEvent();
    await this.getFaculties();
    await this.getElectoralRegister();
    this.groupElectors();
  }

  getElectoralEvent = () => {
    this.setState({ lodingElectoralEvent: true })
    electoralEventService.get(this.state.electoralEventPublickey)
      .then(electoralEvent => {
        this.setState({ electoralEvent })
        this.setState({ lodingElectoralEvent: false })
      })
  }

  getFaculties = () => {
    this.setState({ loadingFaculties: true })
    return new Promise((resolve, reject) => {
      facultyService.getAll()
        .then(async response => {
          let faculties = [];
          for (const faculty of response) {
            faculty['key'] = faculty.id
            faculty['schools'] = await schoolService.getAll(faculty.id);
            faculty['schools'] = faculty['schools'].map(school => { school['key'] = `${faculty['key']}.${school.id}`; return school; })
            faculties.push(faculty);
          }
          resolve(this.setState({
            faculties,
            loadingFaculties: false
          }))
        })
        .catch(error => {
          console.log('error', error);
          this.setState({ loadingFaculties: false })
        })
    })
  }

  getElectoralRegister = () => {
    this.setState({ loadingElectors: true })
    return new Promise((resolve, reject) => {
      electoralEventService.getElectoralRegister(this.state.electoralEventPublickey)
        .then(response => {
          response = response.map(elector => { elector['elector'] = `V-${elector.identityDocument} ${elector.apellido1} ${elector.inicialApellido2} ${elector.nombre1} ${elector.inicialNombre2}`; return elector })
          resolve(this.setState({
            electors: response,
            loadingElectors: false
          }))
        })
        .catch(error => {
          console.log('error', error)
          this.setState({ loadingElectors: false })
        })
    })
  }

  groupElectors = () => {
    let groupElectors;
    const groupByType = this.groupBy('type');
    const groupByFaculty = this.groupBy('facultyId');
    const groupBySchool = this.groupBy('schoolId');
    groupElectors = groupByType(this.state.electors);
    for (const type in groupElectors) {
      groupElectors[type] = groupByFaculty(groupElectors[type])
      for (const faculty in groupElectors[type]) {
        groupElectors[type][faculty] = groupBySchool(groupElectors[type][faculty])
      }
    }
    this.setState({ groupElectors })
  }

  RenderGroupElectors = () => {
    const groupElectors = { ...this.state.groupElectors };
    let render = [];

    for (const type in groupElectors) {
      if (this.state.typeElectorSelected !== 'all')
        if (this.state.typeElectorSelected !== type)
          continue

      render.push(
        <div style={{ paddingTop: '30px' }} >
          <span
            style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '16px', color: '#000000' }}>
            REGISTRO ELECTORAL DE {type}
          </span>
        </div>
      );

      const faculties = groupElectors[type];
      for (const facultyId in faculties) {
        if (this.state.facultySelected !== 'all')
          if (parseInt(this.state.facultySelected) !== parseInt(facultyId))
            continue

        const schools = faculties[facultyId];
        const faculty = this.state.faculties.find(faculty => parseInt(faculty.id) === parseInt(facultyId));

        render.push(
          <Divider style={{ paddingTop: '20px' }}>
            <span style={{ textTransform: 'uppercase', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', color: '#000000' }}>
              Facultad de {faculty.name}
            </span>
          </Divider>);

        for (const schoolId in schools) {
          if (this.state.schoolSelected !== 'all')
            if (parseInt(this.state.schoolSelected) !== parseInt(schoolId))
              continue

          const electors = schools[schoolId];
          const school = faculty.schools.find(school => parseInt(school.id) === parseInt(schoolId));

          render.push(
            <span style={{ textTransform: 'uppercase', textAlign: 'center', fontWeight: '500', fontSize: '12px', color: '#000000' }}>
              Escuela de {school.name}
            </span>
          )

          render.push(
            <Table
              rowKey={school.name}
              size='default'
              bordered={true}
              columns={this.columns}
              // pagination={false}
              scroll={{ x: true }}
              dataSource={electors}
            />
          )
        }
      }
    }
    return render
  }

  handleChangeTypeElector = (typeElectorSelected) => {
    this.setState({ typeElectorSelected, facultySelected: 'all', schoolSelected: 'all' });
  }

  handleChangeFaculty = (facultySelected) => {
    this.setState({ facultySelected, schoolSelected: 'all' });
  }

  handleChangeSchool = (schoolSelected) => {
    this.setState({ schoolSelected });
  }

  renderFacultiesOptions = () => {
    const faculties = this.state.faculties;
    return (faculties.map(faculty => <Select.Option key={faculty.id}>{faculty.name}</Select.Option>))
  }

  renderSchoolsOptions = () => {
    const facultySelected = this.state.facultySelected;
    const faculties = this.state.faculties;
    const schools = faculties.find(faculty => parseInt(faculty.id) === parseInt(facultySelected)).schools;
    return (schools.map(school => <Select.Option key={school.id}>{school.name}</Select.Option>))
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Buscar elector`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onKeyUp={() => this.handleSearch(selectedKeys)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleCloseSearch(confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Listo
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reiniciar
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined, fontSize: '20px', width: '60px' }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleCloseSearch = (confirm) => {
    confirm();
  };

  handleSearch = (selectedKeys) => {
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const { RenderGroupElectors } = this;

    return (
      <div style={{ padding: '50px 50px' }}>

        {(this.state.loadingElectors || this.state.lodingElectoralEvent || this.state.loadingFaculties) && (
          <Spinner color='black' />
        )}
        {(!this.state.loadingElectors && !this.state.lodingElectoralEvent && !this.state.loadingFaculties) && (
          <div>
            <Card>
              <Form.Item style={{ marginBottom: '0px' }}>
                <h1 ><span style={{ fontWeight: 400 }} >{this.state.electoralEvent.name}</span></h1>
              </Form.Item>
              <Row gutter={10}>
                {/* TYPE ELECTOR */}
                <Col
                  xs={24}
                  sm={24}
                  md={8}
                  lg={8}
                  xl={8}
                >
                  <Form.Item
                    label={(
                      <span>Tipo Elector</span>
                    )}
                  >
                    <Select style={{ width: '100%' }} value={this.state.typeElectorSelected} onChange={this.handleChangeTypeElector} >
                      <Select.Option key='all'>Todos</Select.Option>
                      <Select.Option key='estudiante'>Estudiante</Select.Option>
                      <Select.Option key='egresado'>Egresado</Select.Option>
                      <Select.Option key='profesor'>Profesor</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                {/* TYPE ELECTOR */}

                {/* FACULTY */}
                <Col
                  xs={24}
                  sm={24}
                  md={8}
                  lg={8}
                  xl={8}
                >
                  <Form.Item
                    label={(
                      <span>Facultad</span>
                    )}
                  >
                    <Select style={{ width: '100%' }} value={this.state.facultySelected} onChange={this.handleChangeFaculty}>
                      <Select.Option key='all'>Todas</Select.Option>
                      {this.renderFacultiesOptions()}
                    </Select>
                  </Form.Item>
                </Col>
                {/* FACULTY */}

                {/* SCHOOL */}
                {this.state.facultySelected !== 'all' && (
                  <Col
                    xs={24}
                    sm={24}
                    md={8}
                    lg={8}
                    xl={8}
                  >
                    <Form.Item
                      label={(
                        <span>Escuela</span>
                      )}
                    >
                      <Select style={{ width: '100%' }} value={this.state.schoolSelected} onChange={this.handleChangeSchool}>
                        <Select.Option key='all'>Todas</Select.Option>
                        {this.renderSchoolsOptions()}
                      </Select>
                    </Form.Item>
                  </Col>
                )}
                {/* SCHOOL */}
              </Row>
            </Card>
            <RenderGroupElectors />
          </div>
        )}
      </div >
    );
  }
}

export { ElectorList };