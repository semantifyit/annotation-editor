import * as React from 'react';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';

import { getDescriptionOfNode, getNameOfNode } from '../helpers/helper';
import { ISingleOption } from './DropDownSelect';
import Annotation from './Annotation';
import VocabSelection from './VocabSelection';
import { INode } from '../helpers/Vocab';
import { IContext, VocabContext } from '../helpers/VocabContext';
import * as p from '../helpers/properties';
import { haveCommon } from '../helpers/util';

interface IState {
  createdType: null | string;
  selectedValue: string;
  bases: null | INode[];
}

class AnnotationBlank extends React.Component<{}, IState> {
  public static contextType = VocabContext;
  public context: IContext;
  public state: IState = {
    createdType: null,
    selectedValue: '',
    bases: null,
  };

  public getBases = (): INode[] =>
    this.context.vocab
      .getAllNodes()
      .filter((o) => o['@type'] && haveCommon(o['@type'], p.classes));

  public async componentDidMount() {
    await this.context.vocab.setDefaultVocabs('schema');
    this.setState({ bases: this.getBases() });
  }

  public createBase(value: string) {
    this.setState({ createdType: value });
  }

  public reloadPage = () => {
    this.setState({ bases: this.getBases() });
  };

  public render() {
    if (!this.state.bases) {
      return <h1>Loading ...</h1>;
    }
    return (
      <div>
        <section
          className="jumbotron text-center"
          style={{ backgroundColor: '#fff' }}
        >
          <div className="container">
            <h1 className="jumbotron-heading">Create your Annotation</h1>
          </div>
        </section>
        <div className="float-right">
          <VocabSelection reloadClick={this.reloadPage} />
        </div>
        <div className="row" style={{ margin: 0 }}>
          <h4>Choose a type:</h4>
          <div className="col-sm-4 col-sm-offset-4">
            <Select
              options={this.state.bases
                .sort((a, b) =>
                  getNameOfNode(a).localeCompare(getNameOfNode(b)),
                )
                .map((c) => ({
                  value: c['@id'],
                  label: getNameOfNode(c),
                  title: getDescriptionOfNode(c),
                }))}
              onChange={(e: ISingleOption) => this.createBase(e.value)}
              isSearchable={true}
            />
          </div>
        </div>
        <br />
        <div>
          {this.state.createdType && (
            <Annotation typeID={this.state.createdType} generateButton={true} />
          )}
        </div>
      </div>
    );
  }
}

export default AnnotationBlank;
