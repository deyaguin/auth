import IAttribute from './Attribute';

interface IOperation {
	operation_id: string;
	name: string;
	attributes: IAttribute[];
}

export default IOperation;
