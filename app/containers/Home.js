import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { showModalAddDataset, apiGetDatasets } from './../actions';

// material-ui components
import {GridList} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// Custom components
import DatasetTile from './../components/DatasetTile';
import AddDatasetDialog from './../components/AddDatasetDialog';

class Home extends Component {

    constructor(props) {
        super(props);
        this.props.onLoadDatasets();
    }
    render() {
        let estilo = {
            display: 'flex',
            height: 'auto',
            width: '100%',
            overflowY: 'auto'
        };

        let circularProgressStyle = {
            margin: '30px',
            textAlign: 'center',
            width: '100%'
        };
        let style = {
            marginRight: 20,
        };
        let divFloat = {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        };
        if (this.props.allDatasets.length !== 0 &&
            this.props.allDatasets.length !== undefined) {
            return (
                <div>
                    <GridList cellHeight={230} cols={4} style={estilo}>
                        <Subheader>Available datasets</Subheader>
                        {
                            this.props.allDatasets.map(dataset =>
                                 <DatasetTile { ...dataset } key={ dataset.id }/>
                            )
                        }
                    </GridList>
                    <div style={divFloat}>
                        <FloatingActionButton secondary={true} style={style} onTouchTap={this.props.onTouchAddDataset}>
                            <ContentAdd />
                        </FloatingActionButton>
                    </div>
                    <AddDatasetDialog active={this.props.showModalAddDataset} closeModal={this.props.onTouchCloseModal}/>
                </div>
            );
        }
        return (
            <div style={circularProgressStyle}>
                <CircularProgress size={100} thickness={4} />
            </div>
        );
    }
}

Home.displayName = 'Home';
Home.propTypes = {
    allDatasets: PropTypes.array,
    onLoadDatasets: PropTypes.func,
    onTouchAddDataset: PropTypes.func,
    onTouchCloseModal: PropTypes.func,
    showModalAddDataset: PropTypes.bool
};
const mapStateToProps = (state) => {
    return {
        showModalAddDataset: state.showModalAddDataset,
        allDatasets: state.allDatasets.filter((dataset) => {
            // As dataset array may contain unused entries, they must be cleaned out
            return dataset !== undefined;
        })
    };
};

const mapDispatchToProps = (dispatch) => ({
    onTouchAddDataset: () => dispatch(showModalAddDataset(true)),
    onTouchCloseModal: () => dispatch(showModalAddDataset(false)),
    onLoadDatasets: () => dispatch(apiGetDatasets())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
