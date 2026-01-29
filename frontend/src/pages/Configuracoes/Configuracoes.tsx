import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Button as AntButton,
  Table,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Space,
  Tag,
  Empty,
} from 'antd';
import { Button } from '../../components/common/Button';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { PageHeaderContainer, PageTitle, PageSubtitle } from '../../components/common/PageHeader';
import { ConfiguracoesContainer, StyledCollapse, StoreHeader, StoreInfo, StoreName, StoreMeta, StoreActions, UsersTableContainer } from './Configuracoes.styled';
import { storesService, Store, CreateStoreDto, UpdateStoreDto } from '../../services/stores';
import { usersService, User, CreateUserDto, UpdateUserDto } from '../../services/users';
import { useAuth } from '../../contexts/AuthContext';

const { Panel } = StyledCollapse;

const Configuracoes = () => {
  const { user, refreshUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [stores, setStores] = useState<Store[]>([]);
  const [users, setUsers] = useState<{ [storeId: string]: User[] }>({});
  const [loading, setLoading] = useState(false);
  const [storeModalVisible, setStoreModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentStoreId, setCurrentStoreId] = useState<string | null>(null);
  const [storeForm] = Form.useForm();
  const [userForm] = Form.useForm();

  const isSuperAdmin = user?.role === 'super_admin';

  useEffect(() => {
    loadStores();
  }, []);

  useEffect(() => {
    // Verificar se deve abrir o modal de edição do próprio perfil
    if (searchParams.get('editProfile') === 'true' && user) {
      handleEditOwnProfile();
      // Remover o parâmetro da URL
      setSearchParams({});
    }
  }, [searchParams, user]);

  const loadStores = async () => {
    try {
      setLoading(true);
      
      if (isSuperAdmin) {
        // Super Admin vê todas as lojas
        const data = await storesService.getAll();
        setStores(data);
        
        // Carregar usuários de cada loja
        const usersData: { [storeId: string]: User[] } = {};
        for (const store of data) {
          usersData[store.id] = await usersService.getAll(store.id);
        }
        
        // Carregar todos os usuários (incluindo super admin sem loja)
        const allUsers = await usersService.getAll();
        // Adicionar usuários sem loja a uma lista especial
        const usersWithoutStore = allUsers.filter(u => !u.store_id);
        if (usersWithoutStore.length > 0) {
          usersData['_no_store'] = usersWithoutStore;
        }
        
        setUsers(usersData);
      } else if (user?.store_id) {
        // Store Admin vê apenas sua loja
        const storeData = await storesService.getById(user.store_id);
        setStores([storeData]);
        const storeUsers = await usersService.getAll(user.store_id);
        setUsers({ [user.store_id]: storeUsers });
      }
    } catch (error: any) {
      message.error('Erro ao carregar lojas: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const loadUsersForStore = async (storeId: string) => {
    try {
      const data = await usersService.getAll(storeId);
      setUsers(prev => ({ ...prev, [storeId]: data }));
    } catch (error: any) {
      message.error('Erro ao carregar usuários: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleCreateStore = () => {
    setEditingStore(null);
    storeForm.resetFields();
    setStoreModalVisible(true);
  };

  const handleEditStore = (store: Store) => {
    setEditingStore(store);
    storeForm.setFieldsValue({ name: store.name });
    setStoreModalVisible(true);
  };

  const handleDeleteStore = async (storeId: string) => {
    try {
      await storesService.delete(storeId);
      message.success('Loja deletada com sucesso');
      loadStores();
    } catch (error: any) {
      message.error('Erro ao deletar loja: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleStoreSubmit = async (values: any) => {
    try {
      if (editingStore) {
        const updateData: UpdateStoreDto = { name: values.name };
        await storesService.update(editingStore.id, updateData);
        message.success('Loja atualizada com sucesso');
      } else {
        const createData: CreateStoreDto = {
          name: values.name,
          email: values.email,
          password: values.password,
          admin_name: values.admin_name,
        };
        await storesService.create(createData);
        message.success('Loja criada com sucesso');
      }
      setStoreModalVisible(false);
      storeForm.resetFields();
      loadStores();
    } catch (error: any) {
      message.error('Erro ao salvar loja: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleCreateUser = (storeId: string) => {
    setEditingUser(null);
    setCurrentStoreId(storeId);
    userForm.resetFields();
    userForm.setFieldsValue({ role: 'user', store_id: storeId });
    setUserModalVisible(true);
  };

  const handleEditOwnProfile = async () => {
    if (!user) return;
    
    try {
      // Buscar dados atualizados do usuário
      const userData = await usersService.getById(user.id);
      setEditingUser(userData);
      setCurrentStoreId(userData.store_id || null);
      userForm.setFieldsValue({
        name: userData.name,
        email: userData.email,
        role: userData.role,
        store_id: userData.store_id,
      });
      setUserModalVisible(true);
    } catch (error: any) {
      message.error('Erro ao carregar dados do usuário: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setCurrentStoreId(user.store_id || null);
    userForm.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
      store_id: user.store_id,
    });
    setUserModalVisible(true);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await usersService.delete(userId);
      message.success('Usuário deletado com sucesso');
      if (currentStoreId) {
        loadUsersForStore(currentStoreId);
      } else {
        loadStores();
      }
    } catch (error: any) {
      message.error('Erro ao deletar usuário: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleUserSubmit = async (values: any) => {
    try {
      const isEditingSelf = editingUser?.id === user?.id;
      
      if (editingUser) {
        const updateData: UpdateUserDto = {
          name: values.name,
          email: values.email,
          ...(values.password && { password: values.password }),
        };
        
        // Apenas permitir alterar role e store_id se não estiver editando a si mesmo
        if (!isEditingSelf) {
          updateData.role = values.role;
          if (isSuperAdmin && values.store_id !== undefined) {
            updateData.store_id = values.store_id;
          }
        }
        
        await usersService.update(editingUser.id, updateData);
        message.success(isEditingSelf ? 'Perfil atualizado com sucesso' : 'Usuário atualizado com sucesso');
        
        // Se estiver editando a si mesmo, atualizar dados do usuário no contexto
        if (isEditingSelf) {
          await refreshUser();
        }
      } else {
        const createData: CreateUserDto = {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role || 'user',
          store_id: values.store_id === null || values.store_id === '' ? undefined : values.store_id,
        };
        await usersService.create(createData);
        message.success('Usuário criado com sucesso');
      }
      setUserModalVisible(false);
      userForm.resetFields();
      if (currentStoreId) {
        loadUsersForStore(currentStoreId);
      } else {
        loadStores();
      }
    } catch (error: any) {
      message.error('Erro ao salvar usuário: ' + (error.response?.data?.error || error.message));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoleTag = (role: string) => {
    const roleMap: { [key: string]: { color: string; label: string } } = {
      super_admin: { color: 'red', label: 'Super Admin' },
      store_admin: { color: 'blue', label: 'Admin da Loja' },
      user: { color: 'default', label: 'Usuário' },
    };
    const roleInfo = roleMap[role] || roleMap.user;
    return <Tag color={roleInfo.color}>{roleInfo.label}</Tag>;
  };

  const userColumns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: (name: string, record: User) => name || record.email.split('@')[0],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '25%',
    },
    {
      title: 'Perfil',
      dataIndex: 'role',
      key: 'role',
      width: '18%',
      render: (role: string) => getRoleTag(role),
    },
    {
      title: 'Criado em',
      dataIndex: 'created_at',
      key: 'created_at',
      width: '18%',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Ações',
      key: 'actions',
      width: '14%',
      align: 'right' as const,
      render: (_: any, record: User) => (
        <Space>
          <AntButton
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
            style={{ padding: '0 8px' }}
          >
            Editar
          </AntButton>
          <Popconfirm
            title="Tem certeza que deseja deletar este usuário?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <AntButton
              type="link"
              danger
              icon={<DeleteOutlined />}
              style={{ padding: '0 8px' }}
            >
              Deletar
            </AntButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (!isSuperAdmin && user?.role !== 'store_admin') {
    return (
      <ConfiguracoesContainer>
        <PageHeaderContainer>
          <PageTitle>Configurações</PageTitle>
          <PageSubtitle>Acesso negado</PageSubtitle>
        </PageHeaderContainer>
        <Empty description="Você não tem permissão para acessar esta página" />
      </ConfiguracoesContainer>
    );
  }

  return (
    <ConfiguracoesContainer>
      <PageHeaderContainer>
        <PageTitle>Configurações</PageTitle>
        <PageSubtitle>Gerencie lojas e usuários do sistema</PageSubtitle>
      </PageHeaderContainer>

      {isSuperAdmin && (
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateStore}
          >
            Nova Loja
          </Button>
        </div>
      )}

      {stores.length === 0 && !loading ? (
        <Empty description="Nenhuma loja encontrada" />
      ) : (
        <StyledCollapse
          onChange={(keys: string | string[]) => {
            const activeKeys = Array.isArray(keys) ? keys : [keys];
            activeKeys.forEach((key) => {
              const store = stores.find((s) => s.id === key);
              if (store && !users[store.id]) {
                loadUsersForStore(store.id);
              }
            });
          }}
        >
          {stores.map((store) => (
            <Panel
              key={store.id}
              header={
                <StoreHeader>
                  <StoreInfo>
                    <StoreName>
                      <ShopOutlined style={{ marginRight: 8 }} />
                      {store.name}
                    </StoreName>
                    <StoreMeta>
                      Criada em {formatDate(store.created_at)}
                    </StoreMeta>
                  </StoreInfo>
                  {isSuperAdmin && (
                    <StoreActions onClick={(e) => e.stopPropagation()}>
                      <AntButton
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEditStore(store)}
                      >
                        Editar
                      </AntButton>
                      <Popconfirm
                        title="Tem certeza que deseja deletar esta loja?"
                        description="Todos os usuários desta loja também serão deletados."
                        onConfirm={() => handleDeleteStore(store.id)}
                        okText="Sim"
                        cancelText="Não"
                      >
                        <AntButton
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                        >
                          Deletar
                        </AntButton>
                      </Popconfirm>
                    </StoreActions>
                  )}
                </StoreHeader>
              }
            >
              <div style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  icon={<UserOutlined />}
                  onClick={() => handleCreateUser(store.id)}
                >
                  Novo Usuário
                </Button>
              </div>
              <UsersTableContainer>
                <Table
                  dataSource={users[store.id] || []}
                  columns={userColumns}
                  rowKey="id"
                  pagination={false}
                  locale={{
                    emptyText: 'Nenhum usuário encontrado',
                  }}
                />
              </UsersTableContainer>
            </Panel>
          ))}
        </StyledCollapse>
      )}

      {/* Modal de Loja */}
      <Modal
        title={editingStore ? 'Editar Loja' : 'Nova Loja'}
        open={storeModalVisible}
        onCancel={() => {
          setStoreModalVisible(false);
          storeForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={storeForm}
          layout="vertical"
          onFinish={handleStoreSubmit}
        >
          <Form.Item
            name="name"
            label="Nome da Loja"
            rules={[{ required: true, message: 'Nome é obrigatório' }]}
          >
            <Input placeholder="Digite o nome da loja" />
          </Form.Item>
          {!editingStore && (
            <>
              <Form.Item
                name="admin_name"
                label="Nome do Admin"
                rules={[{ required: true, message: 'Nome do admin é obrigatório' }]}
              >
                <Input placeholder="Nome completo do administrador" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email do Admin"
                rules={[
                  { required: true, message: 'Email é obrigatório' },
                  { type: 'email', message: 'Email inválido' },
                ]}
              >
                <Input placeholder="admin@loja.com" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Senha do Admin"
                rules={[
                  { required: true, message: 'Senha é obrigatória' },
                  { min: 6, message: 'Senha deve ter no mínimo 6 caracteres' },
                ]}
              >
                <Input.Password placeholder="Digite a senha" />
              </Form.Item>
            </>
          )}
          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingStore ? 'Atualizar' : 'Criar'}
              </Button>
              <AntButton onClick={() => {
                setStoreModalVisible(false);
                storeForm.resetFields();
              }}>
                Cancelar
              </AntButton>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal de Usuário */}
      <Modal
        title={editingUser?.id === user?.id ? 'Editar Meu Perfil' : editingUser ? 'Editar Usuário' : 'Novo Usuário'}
        open={userModalVisible}
        onCancel={() => {
          setUserModalVisible(false);
          userForm.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={userForm}
          layout="vertical"
          onFinish={handleUserSubmit}
        >
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Nome é obrigatório' }]}
          >
            <Input placeholder="Nome completo do usuário" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email é obrigatório' },
              { type: 'email', message: 'Email inválido' },
            ]}
          >
            <Input placeholder="usuario@exemplo.com" />
          </Form.Item>
          {isSuperAdmin && editingUser?.id !== user?.id && (
            <Form.Item
              name="store_id"
              label="Loja"
              rules={[
                { 
                  required: (userForm.getFieldValue('role') !== 'super_admin'), 
                  message: 'Loja é obrigatória para usuários que não são Super Admin' 
                }
              ]}
            >
              <Select placeholder="Selecione a loja (opcional para Super Admin)">
                <Select.Option value={null}>Sem loja (apenas Super Admin)</Select.Option>
                {stores.map((store) => (
                  <Select.Option key={store.id} value={store.id}>
                    {store.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {editingUser?.id !== user?.id && (
            <Form.Item
              name="role"
              label="Perfil"
              rules={[{ required: true, message: 'Perfil é obrigatório' }]}
            >
              <Select placeholder="Selecione o perfil">
                <Select.Option value="user">Usuário</Select.Option>
                <Select.Option value="store_admin">Admin da Loja</Select.Option>
                {isSuperAdmin && (
                  <Select.Option value="super_admin">Super Admin</Select.Option>
                )}
              </Select>
            </Form.Item>
          )}
          {editingUser?.id === user?.id && (
            <Form.Item
              name="role"
              label="Perfil"
            >
              <Input 
                disabled 
                value={editingUser?.role === 'super_admin' ? 'Super Admin' : 
                       editingUser?.role === 'store_admin' ? 'Admin da Loja' : 'Usuário'} 
              />
            </Form.Item>
          )}
          <Form.Item
            name="password"
            label={editingUser ? 'Nova Senha (deixe em branco para manter)' : 'Senha'}
            rules={
              !editingUser
                ? [
                    { required: true, message: 'Senha é obrigatória' },
                    { min: 6, message: 'Senha deve ter no mínimo 6 caracteres' },
                  ]
                : []
            }
          >
            <Input.Password placeholder="Digite a senha" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingUser ? 'Atualizar' : 'Criar'}
              </Button>
              <AntButton onClick={() => {
                setUserModalVisible(false);
                userForm.resetFields();
              }}>
                Cancelar
              </AntButton>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </ConfiguracoesContainer>
  );
};

export default Configuracoes;
