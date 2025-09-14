interface OpeningProps {
  onGetStartedFree: () => void;
  onLogin: () => void;
}
const Opening :React.FC<OpeningProps> = ({onGetStartedFree, onLogin}) =>{
    return(
    <div>
      <button onClick={onGetStartedFree}>Get Started Free</button>
      <button onClick={onLogin}>Login</button>
    </div>
    )
}
export default Opening