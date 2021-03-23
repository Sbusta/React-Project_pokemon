import {connect} from 'react-redux'
import styles from './pkCompare.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
  } from 'recharts';
import {clearPokemons} from '../../actions/compareActions';

const pkCompare = (props) => {
  const first = props.compare.first;
  const second = props.compare.second;

  const closeCompareWindow = () => {
    props.clearPokemons();
  };

  const stopClickPropagation = (event) =>{
    event.stopPropagation();
  };

  const getGender = () =>{
    let gender = Math.floor(Math.random() * 9) - 1;
    if(gender > 4){
      return 'Female';
    }else if(gender > -1){
      return 'Male';
    }
    return 'Genderless';
  };

  const getData = () =>{
    let data = [
      {
        name: 'HP',
        [first.name]: first.stats[0]['base_stat'],
        [second.name]: second.stats[0]['base_stat']
      },
      {
        name: 'Attack',
        [first.name]: first.stats[1]['base_stat'],
        [second.name]: second.stats[1]['base_stat']
      },
      {
        name: 'Defense',
        [first.name]: first.stats[2]['base_stat'],
        [second.name]: second.stats[2]['base_stat']
      },
      {
        name: 'Sp. Atk',
        [first.name]: first.stats[3]['base_stat'],
        [second.name]: second.stats[3]['base_stat']
      },
      {
        name: 'Sp. Def',
        [first.name]: first.stats[4]['base_stat'],
        [second.name]: second.stats[4]['base_stat']
      },
      {
        name: 'Speed',
        [first.name]: first.stats[5]['base_stat'],
        [second.name]: second.stats[5]['base_stat']
      },
    ];
    return data;
  };

  return(
    <div>
      {
        Object.keys(second).length !== 0 ?
        <div className={styles.compareBackground} onClick={closeCompareWindow}>
          <div className={styles.compareWindow} onClick={stopClickPropagation}>
            <div className={styles.compareHeader}>
              <span>
                {first.name.toUpperCase()} vs {second.name.toUpperCase()}
              </span>
              <button className={styles.closeButton} onClick={closeCompareWindow}>
                x
              </button>
            </div>
            <div className={styles.compareContainer}>
              <div className={styles.imageContainer}>
                <img className={styles.pokemonImg} alt={first.name} src={first.sprites['front_default']}></img>
                <img className={styles.pokemonImg} alt={second.name} src={second.sprites['front_default']}></img>
              </div>
              <div className={styles.charContainer}>
                <div className={styles.charValue}>
                  {first.height/10}m
                </div>
                <div className={styles.charTitle}>
                  Height
                </div>
                <div className={styles.charValue}>
                  {second.height/10}m
                </div>
                <div className={styles.charValue}>
                  {first.weight/10}kg
                </div>
                <div className={styles.charTitle}>
                  Weight
                </div>
                <div className={styles.charValue}>
                  {second.weight/10}kg
                </div>
                <div className={styles.charValue}>
                  {getGender()}
                </div>
                <div className={styles.charTitle}>
                  Gender
                </div>
                <div className={styles.charValue}>
                  {getGender()}
                </div>
                <div className={styles.charValue}>
                  {first.abilities.map((ability) => (
                    <div key={ability.slot}>
                      {ability.ability.name}
                    </div>
                  ))}
                </div>
                <div className={styles.charTitle}>
                  Abilities
                </div>
                <div className={styles.charValue}>
                  {second.abilities.map((ability) => (
                    <div key={ability.slot}>
                      {ability.ability.name}
                    </div>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                data={getData()}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
                >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey={first.name} fill="#8884d8" />
                <Bar dataKey={second.name} fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        : null
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    compare: state.compare
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    clearPokemons: () => dispatch(clearPokemons()),
  };
};

export default connect(mapStateToProps,
             mapDispatchToProps)
             (pkCompare);