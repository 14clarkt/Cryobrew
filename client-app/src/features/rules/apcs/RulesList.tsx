import { observer } from "mobx-react-lite";
import { Button, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import RuleForm from "../forms/RuleForm";
import { Rule } from "../../../app/models/rule";
import DiffSpan from "../../../app/common/display/DiffSpan";
import RuleUpdateForm from "../forms/RuleUpdateForm";
import { useEffect, useState } from "react";

interface Props {
    group: string;
}

export default observer(function APCRules(props: Props) {
    const { rulesStore, modalStore, userStore } = useStore()
    const { loading, rulesList } = rulesStore
    const { isAdmin } = userStore
    const [currentRuleList, setCurrentRuleList] = useState<Rule[]>([])

    useEffect(() => {
        setCurrentRuleList(rulesList.filter((a) => a.group === props.group))
    }, [rulesList])

    return (<>
        {isAdmin && <Grid inverted style={{ color: "white", fontSize: "1.5em" }}>
            <Grid.Row>
                <Grid.Column width={6} />
                <Grid.Column width={4}>
                    <Button
                        onClick={() => modalStore.openModal('Create Rule', <RuleForm group={props.group} />)}
                        color='green'
                        inverted fluid
                        loading={loading}
                        content="Create Rule" />
                </Grid.Column>
                <Grid.Column width={6} />
            </Grid.Row>
        </Grid>}
        <Grid divided inverted style={{ color: "white", fontSize: "1.5em" }}>
            {currentRuleList.map((rule) => (
                <Grid.Row key={rule.id}>
                    <Grid.Column width={2}>
                        <div style={{ color: "cyan", fontWeight: "bold" }}>{rule.title}</div>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <div><DiffSpan content={rule.description}/></div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Button
                            disabled={!isAdmin}
                            color='teal'
                            content='Edit'
                            fluid inverted
                            loading={loading}
                            onClick={() => modalStore.openModal("Update Rule", <RuleUpdateForm rule={rule} />)}
                        />
                    </Grid.Column>
                </Grid.Row>))}
        </Grid></>
    )
})