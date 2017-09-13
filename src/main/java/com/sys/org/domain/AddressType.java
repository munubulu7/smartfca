package com.sys.org.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AddressType.
 */
@Entity
@Table(name = "address_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AddressType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @OneToMany(mappedBy = "addressType")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AddressInformation> addressInfos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public AddressType type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<AddressInformation> getAddressInfos() {
        return addressInfos;
    }

    public AddressType addressInfos(Set<AddressInformation> addressInformations) {
        this.addressInfos = addressInformations;
        return this;
    }

    public AddressType addAddressInfos(AddressInformation addressInformation) {
        this.addressInfos.add(addressInformation);
        addressInformation.setAddressType(this);
        return this;
    }

    public AddressType removeAddressInfos(AddressInformation addressInformation) {
        this.addressInfos.remove(addressInformation);
        addressInformation.setAddressType(null);
        return this;
    }

    public void setAddressInfos(Set<AddressInformation> addressInformations) {
        this.addressInfos = addressInformations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AddressType addressType = (AddressType) o;
        if (addressType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), addressType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AddressType{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            "}";
    }
}
