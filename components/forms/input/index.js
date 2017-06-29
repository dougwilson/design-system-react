'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

// # Input Component

// Implements the [Input design pattern](https://lightningdesignsystem.com/components/forms/#flavor-input) in React. Does not yet implement [fixed text](https://lightningdesignsystem.com/components/forms/#flavor-input-input-fixed-text).
// Based on SLDS v2.2.1
//

// ### React


// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


// ### shortid
// [npmjs.com/package/shortid](https://www.npmjs.com/package/shortid)
// shortid is a short, non-sequential, url-friendly, unique id generator


// ## Children

// This component's `checkProps` which issues warnings to developers about properties when in development mode (similar to React's built in development tools)


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _inputIcon = require('../../icon/input-icon');

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _checkProps = require('./check-props');

var _checkProps2 = _interopRequireDefault(_checkProps);

var _constants = require('../../../utilities/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ## InputDefinition
var Input = _react2.default.createClass({
	// ### Display Name
	// Always use the canonical component name as the React display name.
	displayName: _constants.FORMS_INPUT,
	// ### Prop Types
	propTypes: {
		'aria-activedescendant': _propTypes2.default.string,
		'aria-autocomplete': _propTypes2.default.string,
		/**
   * An HTML ID that is shared with ARIA-supported devices with the
   * `aria-controls` attribute in order to relate the input with
   * another region of the page. An example would be a select box
   * that shows or hides a panel.
   */
		'aria-controls': _propTypes2.default.string,
		'aria-describedby': _propTypes2.default.string,
		'aria-expanded': _propTypes2.default.bool,
		'aria-haspopup': _propTypes2.default.bool,
		'aria-labelledby': _propTypes2.default.string,
		/**
   * An HTML ID that is shared with ARIA-supported devices with the
   * `aria-controls` attribute in order to relate the input with
   * another region of the page. An example would be a search field
   * that shows search results.
   */
		'aria-owns': _propTypes2.default.string,
		'aria-required': _propTypes2.default.bool,
		/**
   * If present, the label associated with this `input` is overwritten
   * by this text and is visually not shown.
   */
		assistiveText: _propTypes2.default.string,
		children: _propTypes2.default.node,
		/**
   * Class names to be added to the outer container of the input.
   */
		className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),
		/**
   * Disables the input and prevents editing the contents.
   */
		disabled: _propTypes2.default.bool,
		/**
   * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
   */
		errorText: _propTypes2.default.string,
		/**
   * Left aligned icon, must be instace of `design-system-react/components/icon/input-icon`
   */
		iconLeft: _propTypes2.default.node,
		/**
   * Right aligned icon, must be instace of `design-system-react/components/icon/input-icon`
   */
		iconRight: _propTypes2.default.node,
		/**
   * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
   */
		id: _propTypes2.default.string,
		/**
   * This callback exposes the input reference / DOM node to parent components. `<Parent inputRef={(inputComponent) => this.input = inputComponent} />
   */
		inputRef: _propTypes2.default.func,
		/**
   * This label appears above the input.
   */
		label: _propTypes2.default.string,
		onBlur: _propTypes2.default.func,
		/**
   * This callback fires when the input changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
   */
		onChange: _propTypes2.default.func,
		/**
   * This event fires when the input is clicked.
   */
		onClick: _propTypes2.default.func,
		onFocus: _propTypes2.default.func,
		onInput: _propTypes2.default.func,
		onInvalid: _propTypes2.default.func,
		onKeyDown: _propTypes2.default.func,
		onKeyPress: _propTypes2.default.func,
		onKeyUp: _propTypes2.default.func,
		onSelect: _propTypes2.default.func,
		onSubmit: _propTypes2.default.func,
		/**
   * Text that will appear in an empty input.
   */
		placeholder: _propTypes2.default.string,
		minLength: _propTypes2.default.string,
		maxLength: _propTypes2.default.string,
		/**
   * Name of the submitted form parameter.
   */
		name: _propTypes2.default.string,
		/**
   * Displays the value of the input statically.
   */
		readOnly: _propTypes2.default.bool,
		/**
   * Highlights the input as a required field (does not perform any validation).
   */
		required: _propTypes2.default.bool,
		/**
   * The `<Input>` element includes support for all HTML5 types.
   */
		type: _propTypes2.default.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),
		/**
   * The input is a controlled component, and will always display this value.
   */
		value: _propTypes2.default.string
	},

	getDefaultProps: function getDefaultProps() {
		return {
			type: 'text'
		};
	},
	componentWillMount: function componentWillMount() {
		// `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
		(0, _checkProps2.default)(_constants.FORMS_INPUT, this.props);

		this.generatedId = _shortid2.default.generate();
		if (this.props.errorText) {
			this.generatedErrorId = _shortid2.default.generate();
		}
	},
	getId: function getId() {
		return this.props.id || this.generatedId;
	},
	getErrorId: function getErrorId() {
		return this.props['aria-describedby'] || this.generatedErrorId;
	},


	// This is convuluted to maintain backwards compatibility. Please remove deprecatedProps on next breaking change.
	getIconRender: function getIconRender(position, iconPositionProp) {
		var icon = void 0;

		/* eslint-disable react/prop-types */
		var deprecatedProps = {
			assistiveText: this.props[iconPositionProp] && this.props[iconPositionProp].props.assistiveText || this.props.iconAssistiveText,
			category: this.props[iconPositionProp] && this.props[iconPositionProp].props.category || this.props.iconCategory,
			name: this.props[iconPositionProp] && this.props[iconPositionProp].props.name || this.props.iconName,
			onClick: this.props[iconPositionProp] && this.props[iconPositionProp].props.onClick || this.props.onIconClick
		};
		/* eslint-enable react/prop-types */

		if (this.props[iconPositionProp] && position && this.props[iconPositionProp]) {
			icon = _react2.default.cloneElement(this.props[iconPositionProp], {
				iconPosition: '' + position
			});
		} else if (deprecatedProps.name) {
			icon = _react2.default.createElement(_inputIcon2.default, _extends({ iconPosition: position }, deprecatedProps));
		}

		return icon;
	},


	// ### Render
	render: function render() {
		var _props = this.props,
		    assistiveText = _props.assistiveText,
		    children = _props.children,
		    className = _props.className,
		    disabled = _props.disabled,
		    errorText = _props.errorText,
		    iconLeft = _props.iconLeft,
		    iconRight = _props.iconRight,
		    inlineEditTrigger = _props.inlineEditTrigger,
		    inputRef = _props.inputRef,
		    label = _props.label,
		    onBlur = _props.onBlur,
		    onChange = _props.onChange,
		    onClick = _props.onClick,
		    onFocus = _props.onFocus,
		    onInput = _props.onInput,
		    onInvalid = _props.onInvalid,
		    onKeyDown = _props.onKeyDown,
		    onKeyPress = _props.onKeyPress,
		    onKeyUp = _props.onKeyUp,
		    onSelect = _props.onSelect,
		    onSubmit = _props.onSubmit,
		    minLength = _props.minLength,
		    maxLength = _props.maxLength,
		    name = _props.name,
		    placeholder = _props.placeholder,
		    readOnly = _props.readOnly,
		    required = _props.required,
		    role = _props.role,
		    type = _props.type,
		    value = _props.value;


		var labelText = label || assistiveText; // One of these is required to pass accessibility tests

		// this is a hack to make left the default prop unless overwritten by `iconPosition="right"`
		var hasLeftIcon = !!iconLeft || (this.props.iconPosition === 'left' || this.props.iconPosition === undefined) && !!this.props.iconName;
		var hasRightIcon = !!iconRight || this.props.iconPosition === 'right' && !!this.props.iconName;

		return _react2.default.createElement(
			'div',
			{
				className: (0, _classnames2.default)('slds-form-element', {
					'slds-has-error': errorText
				}, className)
			},
			labelText && (readOnly ? _react2.default.createElement(
				'span',
				{ className: (0, _classnames2.default)('slds-form-element__label', { 'slds-assistive-text': assistiveText && !label }) },
				labelText
			) : _react2.default.createElement(
				'label',
				{
					className: (0, _classnames2.default)('slds-form-element__label', { 'slds-assistive-text': assistiveText && !label }),
					htmlFor: this.getId()
				},
				required && _react2.default.createElement(
					'abbr',
					{ className: 'slds-required', title: 'required' },
					'*'
				),
				labelText
			)),
			_react2.default.createElement(
				'div',
				{
					className: (0, _classnames2.default)('slds-form-element__control', {
						'slds-input-has-icon': hasLeftIcon || hasRightIcon,
						'slds-input-has-icon--left': hasLeftIcon && !hasRightIcon,
						'slds-input-has-icon--right': !hasLeftIcon && hasRightIcon,
						'slds-input-has-icon--left-right': hasLeftIcon && hasRightIcon,
						'slds-has-divider--bottom': readOnly && !inlineEditTrigger
					})
				},
				hasLeftIcon ? this.getIconRender('left', 'iconLeft') : null,
				!readOnly && _react2.default.createElement('input', {
					'aria-activedescendant': this.props['aria-activedescendant'],
					'aria-autocomplete': this.props['aria-autocomplete'],
					'aria-controls': this.props['aria-controls'],
					'aria-labelledby': this.props['aria-labelledby'],
					'aria-describedby': this.getErrorId(),
					'aria-expanded': this.props['aria-expanded'],
					'aria-owns': this.props['aria-owns'],
					'aria-required': this.props['aria-required'],
					className: 'slds-input',
					disabled: disabled,
					id: this.getId(),
					minLength: minLength,
					maxLength: maxLength,
					name: name,
					onBlur: onBlur,
					onChange: onChange,
					onClick: onClick,
					onFocus: onFocus,
					onInput: onInput,
					onInvalid: onInvalid,
					onKeyDown: onKeyDown,
					onKeyPress: onKeyPress,
					onKeyUp: onKeyUp,
					onSelect: onSelect,
					onSubmit: onSubmit,
					placeholder: placeholder,
					ref: inputRef,
					role: role,
					required: required,
					type: type,
					value: value
				}),
				hasRightIcon ? this.getIconRender('right', 'iconRight') : null,
				readOnly && _react2.default.createElement(
					'span',
					{ className: 'slds-form-element__static', onClick: onClick },
					value,
					inlineEditTrigger
				)
			),
			errorText && _react2.default.createElement(
				'div',
				{ id: this.getErrorId(), className: 'slds-form-element__help' },
				errorText
			),
			children
		);
	}
});

module.exports = Input;