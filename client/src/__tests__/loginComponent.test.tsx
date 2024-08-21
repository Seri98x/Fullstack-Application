// __tests__/simpleTest.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';

const SimpleComponent: React.FC = () => <div>Hello, world!</div>;

describe('SimpleComponent', () => {
  it('renders hello world', () => {
    render(<SimpleComponent />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });
});


// Mock sessionStorage

// const mockSetItem = jest.fn();
// const mockGetItem = jest.fn();
// sessionStorage.setItem = mockSetItem;
// sessionStorage.getItem = mockGetItem;

// // Mock the useIonAlert hook
// jest.mock('@ionic/react', () => ({
//   useIonAlert: jest.fn(() => [jest.fn()]),
//   IonProvider: ({ children }) => <>{children}</>,
// }));

// Mock Redux
// const mockDispatch = jest.fn();
// jest.mock('react-redux', () => ({
//   useDispatch: () => mockDispatch,
//   useSelector: () => ({})
// }));

// describe('Login Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("If Login is rendered!", () => {
//     const { getByText } = render(<App />);
//     expect(getByText("Login")).toBeInTheDocument();
//   });


//     expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
//     expect(screen.getByText(/Login/i)).toBeInTheDocument();
//   });

  // test('displays alert when username or password is missing', async () => {
  //   const mockPresentAlert = jest.fn();
  //   (useIonAlert as jest.Mock).mockReturnValue([mockPresentAlert]);

  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <IonProvider>
  //           <Login />
  //         </IonProvider>
  //       </Router>
  //     </Provider>
  //   );

  //   fireEvent.click(screen.getByText(/Login/i));

  //   await waitFor(() => {
  //     expect(mockPresentAlert).toHaveBeenCalledWith({
  //       header: 'Input Error',
  //       message: 'Please enter both username and password.',
  //       buttons: ['OK'],
  //     });
  //   });
  // });

  // test('dispatches login action and navigates on successful login', async () => {
  //   const mockNavigate = jest.fn();
  //   (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  //   const mockLoginUser = jest.fn().mockResolvedValue({ payload: 'mockToken' });
  //   (loginUser as jest.Mock) = mockLoginUser;

  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <IonProvider>
  //           <Login />
  //         </IonProvider>
  //       </Router>
  //     </Provider>
  //   );

  //   fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'test@example.com' } });
  //   fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

  //   fireEvent.click(screen.getByText(/Login/i));

  //   await waitFor(() => {
  //     expect(mockLoginUser).toHaveBeenCalledWith({ username: 'test@example.com', password: 'password123' });
  //     expect(mockNavigate).toHaveBeenCalledWith('/');
  //     expect(sessionStorage.setItem).toHaveBeenCalledWith('token', JSON.stringify('mockToken'));
  //   });
  // });

  // test('shows error alert on login failure', async () => {
  //   const mockPresentAlert = jest.fn();
  //   (useIonAlert as jest.Mock).mockReturnValue([mockPresentAlert]);

  //   const mockLoginUser = jest.fn().mockRejectedValue(new Error('401'));
  //   (loginUser as jest.Mock) = mockLoginUser;

  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <IonProvider>
  //           <Login />
  //         </IonProvider>
  //       </Router>
  //     </Provider>
  //   );

  //   fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'test@example.com' } });
  //   fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

  //   fireEvent.click(screen.getByText(/Login/i));

  //   await waitFor(() => {
  //     expect(mockPresentAlert).toHaveBeenCalledWith({
  //       header: 'Login Failed',
  //       message: 'Check credentials and try again.',
  //       buttons: ['OK'],
  //     });
  //   });
  // });
