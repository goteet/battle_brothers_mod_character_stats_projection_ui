ProgressbarValueIdentifier.HitpointsProj 	= 'hitpointsProj';
ProgressbarValueIdentifier.FatigueProj 		= 'fatigueProj';
ProgressbarValueIdentifier.BraveryProj 		= 'braveryProj';
ProgressbarValueIdentifier.InitiativeProj 	= 'initiativeProj';
ProgressbarValueIdentifier.MeleeSkillProj 	= 'meleeSkillProj';
ProgressbarValueIdentifier.RangeSkillProj 	= 'rangeSkillProj';
ProgressbarValueIdentifier.MeleeDefenseProj = 'meleeDefenseProj';
ProgressbarValueIdentifier.RangeDefenseProj = 'rangeDefenseProj';


CharacterScreenStatsModule.prototype.setProgressbarValues_ = CharacterScreenStatsModule.prototype.setProgressbarValues;
CharacterScreenStatsModule.prototype.setProgressbarValues = function(_data)
{
	this.setProgressbarValues_(_data);
	this.setProgressbarValueWithProj(this.mLeftStatsRows.Hitpoints.Progressbar, _data, ProgressbarValueIdentifier.Hitpoints, ProgressbarValueIdentifier.HitpointsMax, ProgressbarValueIdentifier.HitpointsProj);
	this.setProgressbarValueWithProj(this.mLeftStatsRows.Fatigue.Progressbar, _data, ProgressbarValueIdentifier.Fatigue, ProgressbarValueIdentifier.FatigueMax, ProgressbarValueIdentifier.FatigueProj);
	this.setProgressbarValueWithProj(this.mLeftStatsRows.Bravery.Progressbar, _data, ProgressbarValueIdentifier.Bravery, ProgressbarValueIdentifier.BraveryMax, ProgressbarValueIdentifier.BraveryProj);
    this.setProgressbarValueWithProj(this.mLeftStatsRows.Initiative.Progressbar, _data, ProgressbarValueIdentifier.Initiative, ProgressbarValueIdentifier.InitiativeMax, ProgressbarValueIdentifier.InitiativeProj);
	
	this.setProgressbarValueWithProj(this.mMiddleStatsRows.MeleeSkill.Progressbar, _data, ProgressbarValueIdentifier.MeleeSkill, ProgressbarValueIdentifier.MeleeSkillMax, ProgressbarValueIdentifier.MeleeSkillProj);
    this.setProgressbarValueWithProj(this.mMiddleStatsRows.RangeSkill.Progressbar, _data, ProgressbarValueIdentifier.RangeSkill, ProgressbarValueIdentifier.RangeSkillMax, ProgressbarValueIdentifier.RangeSkillProj);
    this.setProgressbarValueWithProj(this.mMiddleStatsRows.MeleeDefense.Progressbar, _data, ProgressbarValueIdentifier.MeleeDefense, ProgressbarValueIdentifier.MeleeDefenseMax, ProgressbarValueIdentifier.MeleeDefenseProj);
    this.setProgressbarValueWithProj(this.mMiddleStatsRows.RangeDefense.Progressbar, _data, ProgressbarValueIdentifier.RangeDefense, ProgressbarValueIdentifier.RangeDefenseMax, ProgressbarValueIdentifier.RangeDefenseProj);
}

CharacterScreenStatsModule.prototype.setProgressbarValue_ = CharacterScreenStatsModule.prototype.setProgressbarValue;
CharacterScreenStatsModule.prototype.setProgressbarValue = function (_progressbarDiv, _data, _valueKey, _valueMaxKey, _labelKey)
{
	this.setProgressbarValue_(_progressbarDiv, _data, _valueKey, _valueMaxKey, _labelKey);
    if (_valueKey in _data && _data[_valueKey] !== null && _valueMaxKey in _data && _data[_valueMaxKey] !== null)
    {
        _progressbarDiv.changeProgressbarPreviewWidth(_data[_valueKey], _data[_valueMaxKey], false);
	}
}

CharacterScreenStatsModule.prototype.setProgressbarValueWithProj = function (_progressbarDiv, _data, _valueKey, _valueMaxKey, _valueProjKey)
{
	switch(_valueKey)
	{
		case ProgressbarValueIdentifier.Hitpoints:
		case ProgressbarValueIdentifier.Fatigue:
		{
			_progressbarDiv.changeProgressbarLabel('' + _data[_valueKey] + ' / ' + _data[_valueMaxKey] + ' (' + _data[_valueProjKey] + ')');
		} break;
		
		default:
		{
			_progressbarDiv.changeProgressbarLabel('' + _data[_valueKey] + ' (' + _data[_valueProjKey] + ')');
			_progressbarDiv.changeProgressbarPreviewWidth(_data[_valueKey], _data[_valueMaxKey], false);
			_progressbarDiv.changeProgressbarNormalWidth(_data[_valueProjKey], _data[_valueMaxKey], false);
		} break;
	}
};


CharacterScreenStatsModule.prototype.createRowsDIV_ = CharacterScreenStatsModule.prototype.createRowsDIV;
CharacterScreenStatsModule.prototype.createRowsDIV = function (_definitions, _parentDiv)
{
	$.each(_definitions, function (_key, _value)
	{
		_value.Row = $('<div class="stats-row"/>');
		_parentDiv.append(_value.Row);
		var leftStatsRowLayout = $('<div class="l-stats-row"/>');
		_value.Row.append(leftStatsRowLayout);

		var statsRowIconLayout = $('<div class="l-stats-row-icon-column"/>');
		leftStatsRowLayout.append(statsRowIconLayout);
		var statsRowIcon = $('<img/>');
		statsRowIcon.attr('src', _value.IconPath);
		statsRowIconLayout.append(statsRowIcon);

		var statsRowProgressbarLayout = $('<div class="l-stats-row-progressbar-column"/>');
		leftStatsRowLayout.append(statsRowProgressbarLayout);
		var statsRowProgressbarContainer = $('<div class="stats-progressbar-container"/>');
		statsRowProgressbarLayout.append(statsRowProgressbarContainer);

		_value.Progressbar = statsRowProgressbarContainer.createProgressbar(false, _value.StyleName);

		_value.Talent = $('<img class="talent"/>');
		statsRowIconLayout.append(_value.Talent);
	});
};

CharacterScreenLeftPanelHeaderModule.prototype.setLevelUpDialogContentProgressbarValue = function (_progressbarDiv, _data, _valueKey, _valueMaxKey)
{
    if (_valueKey in _data && _data[_valueKey] !== null && _valueMaxKey in _data && _data[_valueMaxKey] !== null)
    {
        _progressbarDiv.changeProgressbarPreviewWidth(_data[_valueKey], _data[_valueMaxKey], true);
        _progressbarDiv.changeProgressbarLabel('' + _data[_valueKey]);
    }
};

CharacterScreenLeftPanelHeaderModule.prototype.setLevelUpDialogContentProgressbarValueWithProj = function (_progressbarDiv, _data, _valueKey, _valueProjKey, _valueMaxKey)
{
    if (_valueKey in _data && _data[_valueKey] !== null && _valueMaxKey in _data && _data[_valueMaxKey] !== null && _valueProjKey in _data && _data[_valueProjKey] !== null)
    {
		_progressbarDiv.changeProgressbarLabel('' + _data[_valueKey] + ' (' + _data[_valueProjKey] + ')');
        _progressbarDiv.changeProgressbarPreviewWidth(_data[_valueKey], _data[_valueMaxKey], true);
        _progressbarDiv.changeProgressbarNormalWidth(_data[_valueProjKey], _data[_valueMaxKey], true);
    }
};

CharacterScreenLeftPanelHeaderModule.prototype.createLevelUpDialogContent_ = CharacterScreenLeftPanelHeaderModule.prototype.createLevelUpDialogContent;
CharacterScreenLeftPanelHeaderModule.prototype.createLevelUpDialogContent = function()
{
	this.mLevelUpLeftStatsRows.Hitpoints.ProgressbarValueIdentifierProj = ProgressbarValueIdentifier.HitpointsProj;
	this.mLevelUpLeftStatsRows.Fatigue.ProgressbarValueIdentifierProj = ProgressbarValueIdentifier.FatigueProj;
	this.mLevelUpLeftStatsRows.Bravery.ProgressbarValueIdentifierProj = ProgressbarValueIdentifier.BraveryProj;
	this.mLevelUpLeftStatsRows.Initiative.ProgressbarValueIdentifierProj = ProgressbarValueIdentifier.InitiativeProj;

	this.mLevelUpRightStatsRows.MeleeSkill.ProgressbarValueIdentifierProj = ProgressbarValueIdentifier.MeleeSkillProj;
	this.mLevelUpRightStatsRows.RangeSkill.ProgressbarValueIdentifierProj = ProgressbarValueIdentifier.RangeSkillProj;
	this.mLevelUpRightStatsRows.MeleeDefense.ProgressbarValueIdentifierProj = ProgressbarValueIdentifier.MeleeDefenseProj;
	this.mLevelUpRightStatsRows.RangeDefense.ProgressbarValueIdentifierProj = ProgressbarValueIdentifier.RangeDefenseProj;
	return this.createLevelUpDialogContent_();
}

CharacterScreenLeftPanelHeaderModule.prototype.createLevelUpDialogContentRow_ = CharacterScreenLeftPanelHeaderModule.prototype.createLevelUpDialogContentRow;
CharacterScreenLeftPanelHeaderModule.prototype.createLevelUpDialogContentRow = function (_definitions, _parentDiv, _data, _stats)
{
    var self = this;

    $.each(_definitions, function(_key, _value)
	{
        var row = $('<div class="row"/>');
        _parentDiv.append(row);
        row.bindTooltip({ contentType: 'ui-element', elementId: _value.TooltipId });

        var image = $('<img/>');
        image.attr('src', _value.IconPath);
        row.append(image);

        _value.Talent = $('<img class="talent" src="' + Path.GFX + 'ui/icons/talent_' + _stats[_value.TalentIdentifier] + '.png"/>');
        _value.Talent.css({ 'width': '3.6rem', 'height': '1.8rem' });
        row.append(_value.Talent);

        var progressbarLayout = $('<div class="l-progressbar-container"/>');
        row.append(progressbarLayout);
        _value.Progressbar = progressbarLayout.createProgressbar(false, _value.StyleName);

        self.setLevelUpDialogContentProgressbarValueWithProj(_value.Progressbar, _data, _value.ProgressbarValueIdentifier, _value.ProgressbarValueIdentifierProj, _value.ProgressbarValueIdentifierMax);

        var buttonLayout = $('<div class="l-increase-button-container"/>');
        row.append(buttonLayout);

        //_value.Button = buttonLayout.createTextButton("+", function(_button)
		_value.Button = buttonLayout.createTextButton("+" + _data[_value.StatValueIdentifier], function(_button)
		{
            self.increaseLevelUpStatValue(_button);
			self.mDataSource.notifyBackendDiceThrow();
        }, 'font-bold', 8);
        _value.Button.data('stat', _key);
		_value.Button.data('isIncreased', false);
    });
};