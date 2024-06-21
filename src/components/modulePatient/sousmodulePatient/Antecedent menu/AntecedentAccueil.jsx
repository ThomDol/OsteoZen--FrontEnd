import React from 'react';
import Antecedent from './Antecedent';

const AntecedentAccueil = (antecedentRes) => {
    return (
        <div>
            {antecedentRes===null && <div className='.btn'>Creer Antecedent</div>}
            {antecedentRes!==null && <Antecedent/>}
        </div>
    );
};

export default AntecedentAccueil;